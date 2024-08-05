// Import required modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('./config/passport');
const validator = require('validator');
const otpGenerator = require("otp-generator");
const nodemailer = require('nodemailer');
const path = require('path'); 
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // Import UUID library
const generateToken = require('./utils/generateToken');
const fs = require('fs');
const { User, Coupon, Address } = require('./model/User'); 
const Order = require('./model/Order');
const Admin = require('./model/Admin');
const Cart = require('./model/Cart'); 
const auth = require('./Middleware/auth'); 
const Product = require('./model/Product'); 
const Wishlist = require('./model/Wishlist');
const Billing = require('./model/billingDetails');
// const productRoutes = require('./routes/productRoutes');
const productsData = require('./scripts/productsData');
const Invoice = require('./model/Invoice');
const Razorpay = require('razorpay');

// Create Express app
const app = express();

// Allow requests from localhost:5173 (your frontend)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));


// // Routes for product operations
// app.use('/api/products', productRoutes);
// app.post('/api/products/import', productController.importProducts); // Import sample products
// app.get('/api/products/flash-sales', productController.getFlashSalesProducts); // Fetch flash sales products


// // Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error("MongoDB connection error:", error));


// const mongoURI = process.env.MONGO_URI; // Fetch MongoDB URI from environment variables

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

//   const db = mongoose.connection;

// // Event listener for MongoDB connection open
// db.once('open', async () => {
//   try {
//     console.log('Connected to MongoDB');

//     // Delete existing products to avoid duplicates (for testing purposes)
//     await Product.deleteMany();

//     // Map productsData to include MongoDB ObjectId as ID and convert price to number
//     const sampleProducts = productsData.map((product) => ({
//       ...product,
//       price: parseFloat(product.price.replace(',', '')), // Convert string to float and remove commas
//       _id: new mongoose.Types.ObjectId(), // Generate a new MongoDB ObjectId
//     }));

//     // Insert sampleProducts into the Product collection
//     await Product.insertMany(sampleProducts);

//     console.log('Data imported successfully');
//   } catch (error) {
//     console.error('Error importing products:', error);
//   } finally {
//     // Close the database connection after import (whether success or failure)
//     mongoose.connection.close();
//   }
// });

// // Event listener for MongoDB connection error
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Start the Express server


// Serve static files (images)
app.use('/uploads', express.static('uploads'));

// Example route to fetch products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/products/import', async (req, res) => {
  try {
    await Product.deleteMany();
    const sampleProducts = productsData.map((product) => ({
      ...product,
      id: uuid(),
    }));
    await Product.insertMany(sampleProducts);
    res.status(201).json({ message: 'Data imported successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// app.get('/api/products/flash-sales', async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });








// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// API endpoint to upload profile image
app.post('/upload', upload.single('profileImage'), async (req, res) => {
  const { username } = req.body;
  const profileImage = req.file.path;

  const user = await User.findOneAndUpdate(
    { username },
    { profileImage },
    { new: true, upsert: true }
  );

  res.json(user);
});

// const generateCouponCode = () => {
//   return `WELCOME-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
// };
// const sendCouponEmail = async (email, couponCode) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//     port: 465,
//     host: 'smtp.gmail.com',
//   });

//   const mailOptions = {
//     from: 'kavinkaviya7@gmail.com',
//     to: email,
//     subject: 'Welcome! Here is your coupon code',
//     text: `Thank you for signing up! Use the following coupon code to get a discount: ${couponCode}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw new Error('Email could not be sent.');
//   }
// };

// // Utility function to generate a coupon code
// function generateCouponCode() {
//   const uuid = uuidv4();
//   const alphanumeric = uuid.replace(/-/g, '').substr(0, 24);
//   const couponCode = `COUPON${alphanumeric}`;
//   return couponCode;
// }



// Initialize Razorpay with credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});


app.post('/api/payment/create-order', async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body;

  // Validate the amount
  if (typeof amount !== 'number' || amount <= 0 || !Number.isInteger(amount)) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  // Generate a unique receipt ID if not provided
  const receiptId = receipt || `order_rcptid_${Date.now()}`;

  try {
    const order = await razorpay.orders.create({
      amount, // Amount in paise
      currency,
      receipt: receiptId,
      payment_capture: 1 // Auto-capture payment
    });

    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// Apply coupon route
app.post('/api/coupons/apply', async (req, res) => {
  const { couponCode, userId } = req.body;

  try {
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      return res.status(400).json({ error: 'Coupon code is invalid.' });
    }

    // Check for expiration date
    if (coupon.valid === 'SPECIFIC_DATE' && new Date(coupon.validDate) < new Date()) {
      return res.status(400).json({ error: 'Coupon code has expired.' });
    }

    // Check usage limits and user usage
    if (coupon.valid === 'LIMITED_USE') {
      if (coupon.usedBy.length >= coupon.limit) {
        return res.status(400).json({ error: 'Coupon code has reached its usage limit.' });
      }
      if (coupon.usedBy.includes(userId)) {
        return res.status(400).json({ error: 'Coupon code has already been used by you.' });
      }
    }

    // Add userId to the usedBy list for "LIMITED_USE" coupons
    if (coupon.valid === 'LIMITED_USE') {
      coupon.usedBy.push(userId);
      await coupon.save();
    }

    res.status(200).json({ message: 'Coupon applied successfully!', discountPercent: coupon.discountPercent });
  } catch (error) {
    console.error('Error applying coupon:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});



// Get discount percentage for a specific coupon code
app.get('/api/coupons/discount/:code', async (req, res) => {
  const { code } = req.params;

  try {
    // Find the coupon by code and project only the discountPercent field
    const coupon = await Coupon.findOne({ code }).select('discountPercent');

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found.' });
    }

    // Return the discount percentage
    res.json({ discountPercent: coupon.discountPercent });

  } catch (error) {
    console.error('Error retrieving discount percentage:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the discount percentage.' });
  }
});

// Get all available coupons
app.get('/api/coupons/available', async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query parameters

    // Fetch coupons; you can filter or modify the query as needed
    const coupons = await Coupon.find();

    // Optionally filter based on userId
    // Example: const coupons = await Coupon.find({ usedBy: { $ne: userId } });

    res.json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    res.status(500).json({ error: 'Error fetching coupons', message: error.message });
  }
});


app.post('/api/invoice/generate', async (req, res) => {
  const { billingInfo, userId, cartProducts, totalAmount } = req.body;

  // Validate the presence of all required fields
  if (!billingInfo || !userId || !cartProducts || totalAmount == null) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  const { firstName, streetAddress, townCity, pincode, mobileNumber } = billingInfo;
  if (!firstName || !streetAddress || !townCity || !pincode || !mobileNumber) {
    return res.status(400).json({ message: 'All billing fields are required' });
  }

  // Optionally, add logging to identify the issue
  // console.log('Received Data:', { billingInfo, userId, cartProducts, totalAmount });

  try {
    const invoiceId = 'INV-' + Math.floor(Math.random() * 1000000);

    const newInvoice = new Invoice({
      userId,
      billingInfo,
      cartProducts,
      totalAmount,
      invoiceId
    });

    await newInvoice.save();

    res.status(200).json({
      message: 'Invoice generated successfully',
      invoiceId: newInvoice.invoiceId,
      invoiceDetails: newInvoice
    });
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// app.post('/api/orders/save', async (req, res) => {
//   const { userId, cartProducts, totalAmount, invoiceId, billingInfo } = req.body;

//   console.log('Received Data:', { userId, cartProducts, totalAmount, invoiceId, billingInfo });

//   if (!userId || !cartProducts || totalAmount == null || !invoiceId || !billingInfo) {
//     return res.status(400).json({ message: 'Required fields are missing' });
//   }

//   const { firstName, streetAddress, townCity, pincode, mobileNumber } = billingInfo;
//   if (!firstName || !streetAddress || !townCity || !pincode || !mobileNumber) {
//     return res.status(400).json({ message: 'All billing fields are required' });
//   }

//   // Log each product in cartProducts for validation
//   for (const product of cartProducts) {
//     console.log('Validating Product:', product);
//     const { id, img, description, price, category, name, shortName } = product;
//     if (!id || !img || !description || price == null || !category || !name || !shortName) {
//       return res.status(400).json({ message: 'Missing required fields in cartProducts', product });
//     }
//   }

//   try {
//     const newOrder = new Order({
//       userId,
//       cartProducts,
//       totalAmount,
//       invoiceId,
//       billingInfo
//     });

//     await newOrder.save();

//     res.status(200).json({
//       message: 'Order saved successfully',
//       orderId: newOrder._id
//     });
//   } catch (error) {
//     console.error('Error saving order:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

app.post('/api/payment/verify', async (req, res) => {
  const { paymentId, orderId, signature } = req.body;

  // Replace with your actual Razorpay secret key
  const razorpaySecret = process.env.RAZORPAY_KEY_SECRET

  try {
    // Generate a signature hash using Razorpay secret key
    const generatedSignature = crypto.createHmac('sha256', razorpaySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    // Compare the generated signature with the provided signature
    if (generatedSignature === signature) {
      // Signature is valid
      res.status(200).json({ message: 'Payment verification successful' });
    } else {
      // Signature is invalid
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.post('/api/orders/save', async (req, res) => {
  const { userId, cartProducts, totalAmount, invoiceId, billingInfo, paymentId, paymentSignature, paymentStatus, paymentMethod } = req.body;

  // Log the received data
  console.log('Received Data:', { userId, cartProducts, totalAmount, invoiceId, billingInfo, paymentId, paymentSignature, paymentStatus, paymentMethod });

  // Validate required fields
  if (!userId || !cartProducts || totalAmount == null || !invoiceId || !billingInfo || !paymentId || !paymentSignature) {
    console.log('Error: Required fields are missing');
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  const { firstName, streetAddress, townCity, pincode, mobileNumber } = billingInfo;
  if (!firstName || !streetAddress || !townCity || !pincode || !mobileNumber) {
    console.log('Error: All billing fields are required');
    return res.status(400).json({ message: 'All billing fields are required' });
  }

  // Validate cart products
  for (const product of cartProducts) {
    console.log('Validating Product:', product);
    const { id, img, description, price, category, name, shortName } = product;
    if (!id || !img || !description || price == null || !category || !name || !shortName) {
      console.log('Error: Missing required fields in cartProducts', { product });
      return res.status(400).json({ message: 'Missing required fields in cartProducts', product });
    }
  }

  // Attempt to save the order
  try {
    console.log('Attempting to save new order to database');
    const newOrder = new Order({
      userId,
      cartProducts,
      totalAmount,
      invoiceId,
      billingInfo,
      paymentId,
      paymentSignature,
      paymentStatus: paymentStatus || 'Pending', // Default to 'Pending' if not provided
      paymentMethod: paymentMethod || 'Others' // Default to 'Others' if not provided
    });

    await newOrder.save();
    console.log('Order saved successfully:', newOrder);

    res.status(200).json({
      message: 'Order saved successfully',
      orderId: newOrder._id
    });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});







app.get('/api/orders/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }); // Find orders by userId
    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});









// API endpoint to get user data
app.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
  },
  port: 465,
  host: "smtp.gmail.com"
});

// Endpoint for Google sign-in
app.post('/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    
    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with user data
    res.json({ user: existingUser });
  } catch (error) {
    console.error('Error signing in with Google:', error);
    res.status(500).json({ error: 'An error occurred while signing in with Google' });
  }
});

// Callback route for Google OAuth2 authentication
app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  try {
    // Create or retrieve the user from the database based on Google ID
    User.findOne({ googleId: req.user.googleId }, (err, user) => {
      if (err) {
        console.error("Error finding user:", err);
        return res.status(500).json({ error: "An error occurred during authentication." });
      }

      if (user) {
        // User found, generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
      } else {
        // User not found, create a new user with Google ID
        const newUser = new User({
          googleId: req.user.googleId,
          email: req.user.email,
          // You can add more user fields here if needed
        });
        newUser.save((err, savedUser) => {
          if (err) {
            console.error("Error saving user:", err);
            return res.status(500).json({ error: "An error occurred during authentication." });
          }
          // User saved, generate JWT token
          const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          return res.json({ token });
        });
      }
    });
  } catch (error) {
    console.error("Error generating JWT token:", error);
    res.status(500).json({ error: "An error occurred during authentication." });
  }
});




app.get('/api/user/get-addresses/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { addressList } = user;
    res.json({ addresses: addressList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/user/save-billing', async (req, res) => {
  const { userId, addressIndex, firstName, streetAddress, townCity, apartment, pincode, mobileNumber } = req.body;

  try {
    let user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newAddress = {
      userId,
      firstName,
      streetAddress,
      townCity,
      apartment,
      pincode,
      mobileNumber
    };

    if (addressIndex !== undefined && addressIndex >= 0) {
      // Update existing address
      user.addressList[addressIndex] = newAddress;
    } else {
      // Check for duplicates before adding
      const isDuplicate = user.addressList.some(address => 
        address.streetAddress === newAddress.streetAddress &&
        address.townCity === newAddress.townCity &&
        address.pincode === newAddress.pincode
      );

      if (isDuplicate) {
        return res.status(400).json({ message: 'Duplicate address found' });
      }

      // Add new address
      user.addressList.push(newAddress);
    }

    await user.save();

    res.json({ message: 'Billing information saved successfully', user });
  } catch (error) {
    console.error('Error saving billing information:', error);
    res.status(500).json({ message: 'An error occurred while saving billing information' });
  }
});



app.post('/api/user/remove-billing-address', async (req, res) => {
  const { userId, addressIndex } = req.body;

  try {
    // Find the user by userId
    let user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure addressIndex is within bounds
    if (addressIndex >= 0 && addressIndex < user.addressList.length) {
      // Remove the address at the specified index
      user.addressList.splice(addressIndex, 1);

      // Save the user document
      await user.save();
      res.json({ message: 'Address removed successfully', user });
    } else {
      res.status(400).json({ message: 'Invalid address index' });
    }
  } catch (error) {
    console.error('Error removing billing address:', error);
    res.status(500).json({ message: 'An error occurred while removing the billing address' });
  }
});











app.post('/api/wishlist/add', async (req, res) => {
  const { userId, product } = req.body;

  // Validate input
  if (!userId || !product || !product.id || !product.name || !product.category || !product.price || !product.description || !product.img || !product.shortName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find the user's wishlist
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      // Create a new wishlist if none exists
      wishlist = new Wishlist({
        userId,
        products: [{
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          description: product.description,
          img: product.img,
          discount: product.discount,
          shortName: product.shortName
        }]
      });
      await wishlist.save();
      return res.status(201).json(wishlist);
    }

    // Check if the product is already in the wishlist
    const productExists = wishlist.products.some(p => p.id === product.id);

    if (productExists) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    // Add the product to the wishlist
    wishlist.products.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      img: product.img,
      discount: product.discount,
      shortName: product.shortName
    });
    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});






// Fetch wishlist by userId
app.get('/api/wishlist/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Remove product from wishlist
app.delete('/api/wishlist/remove/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Find the user's wishlist
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Check if the product exists in the wishlist
    const productExists = wishlist.products.some(p => p.id === productId);

    if (!productExists) {
      return res.status(400).json({ message: 'Product not found in wishlist' });
    }

    // Remove the product from the wishlist
    wishlist.products = wishlist.products.filter(p => p.id !== productId);
    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add or update product in cart
app.post('/api/cart', async (req, res) => {
  try {
    const { userId, product } = req.body;

    // Validate input
    if (!userId || !product || !product.id || !product.name || !product.category || !product.price || !product.description || !product.img || !product.shortName) {
      return res.status(400).json({ error: 'UserId and all product fields are required' });
    }

    // Default quantity to 1 if not provided or invalid
    const quantity = isNaN(product.quantity) || product.quantity <= 0 ? 1 : product.quantity;

    // Find or create a cart for the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        userId,
        products: [{
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          description: product.description,
          img: product.img,
          discount: product.discount || 0,
          shortName: product.shortName,
          quantity
        }]
      });
    } else {
      // Check if the product already exists in the cart
      const existingProductIndex = cart.products.findIndex(p => p.id === product.id);

      if (existingProductIndex !== -1) {
        // Update quantity if the product already exists
        cart.products[existingProductIndex].quantity = quantity;
      } else {
        // Add new product if it does not exist
        cart.products.push({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          description: product.description,
          img: product.img,
          shortName: product.shortName,
          discount: product.discount || 0,
          quantity
        });
      }
    }

    // Remove duplicates by converting to a Map based on product ID
    const uniqueProductsMap = new Map();
    cart.products.forEach(p => {
      if (uniqueProductsMap.has(p.id)) {
        // If the product already exists, update its quantity
        uniqueProductsMap.get(p.id).quantity += p.quantity;
      } else {
        // Otherwise, add the new product
        uniqueProductsMap.set(p.id, p);
      }
    });

    // Convert the Map back to an array
    cart.products = Array.from(uniqueProductsMap.values());

    // Save the cart
    await cart.save();
    res.status(200).json({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Update product quantity in cart
app.put('/api/cart/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const product = cart.products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    product.quantity = quantity;

    await cart.save();

    res.status(200).json({ message: 'Product quantity updated successfully', cart });
  } catch (error) {
    console.error('Error updating product quantity in cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/cart/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find the cart for the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Remove the product with the given ID from the cart
    cart.products = cart.products.filter(p => p.id !== productId);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart successfully', cart });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clear the cart in the backend
app.post('/api/cart/clear', async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  
  try {
    // Find and clear the cart for the given user ID
    await Cart.deleteOne({ userId });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
});



// POST /api/checkout
app.post('/api/checkout', async (req, res) => {
  const { userId, cartProducts, billingDetails, deliveryMethod, totalBillAmount } = req.body;

  // Validate incoming data
  if (!userId || !Array.isArray(cartProducts) || cartProducts.length === 0 || !billingDetails || !deliveryMethod || !totalBillAmount) {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  // Create a new order instance
  const newOrder = new Order({
    userId,
    orderedProducts: cartProducts,
    billingInfo: billingDetails,
    totalProducts: cartProducts.length,
    deliveryMethod,
    totalBillAmount,
    paymentMethod: 'Credit Card', // Assuming a payment method, adjust as needed
  });

  try {
    // Save the new order to the database
    const savedOrder = await newOrder.save();
    res.status(201).json({ orderId: savedOrder._id, message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// // Example backend route to fetch orders by user ID
// app.get('/api/order/:userId', async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     // Retrieve orders from your database or another data source
//     const orders = await Order.find({ userId }).populate('orderedProducts');
//     res.json(orders);
//   } catch (error) {
//     console.error('Failed to fetch orders:', error);
//     res.status(500).json({ message: 'Failed to fetch orders' });
//   }
// });

// // Route to get a specific order by orderId and userId
// app.get('/api/orders/:userId/:orderId', async (req, res) => {
//   const { userId, orderId } = req.params;

//   try {
//     const order = await Order.findOne({ _id: orderId, userId });

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.status(200).json(order);
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Route to update order status by orderId
// app.put('/api/orders/:orderId/status', async (req, res) => {
//   const { orderId } = req.params;
//   const { status } = req.body;
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       { status },
//       { new: true }
//     );
//     res.json(updatedOrder);
//   } catch (error) {
//     console.error('Failed to update order status:', error);
//     res.status(500).json({ error: 'Failed to update order status' });
//   }
// });

// Route to fetch product details for multiple productIds
app.post('/api/products/details', async (req, res) => {
  const { productIds } = req.body;
  try {
    const products = await Order.find({ id: { $in: productIds } });
    res.json(products);
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});




// POST endpoint to create a new admin account
app.post('/api/admin/create', upload.single('profileImage'), async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    // Check if email is already registered
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Construct admin object
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      role: role || 'admin', // Default role to 'admin' if not provided
      profileImage: req.file ? req.file.path : '', // Store path to uploaded image
    });

    // Save admin to database
    await newAdmin.save();

    // Respond with success message
    res.status(201).json({ message: 'Admin account created successfully', admin: newAdmin });
  } catch (error) {
    console.error('Error creating admin account:', error);
    res.status(500).json({ error: 'Failed to create admin account. Please try again.' });
  }
});
// Login endpoint



app.post('/auth/signup', upload.single('profileImage'), async (req, res) => {
  try {
    const { username, email, password, mobileNumber, streetaddress, towncity, pincode } = req.body;
    const profileImage = req.file ? req.file.path : '';

    // Validate input
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ error: 'Valid email is required.' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password is required and should be at least 6 characters long.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const couponCode = generateCouponCode();

    // Create new user
    const newUser = new User({
      userId,
      username,
      email,
      password: hashedPassword,
      mobileNumber,
      streetaddress,
      towncity,
      pincode,
      profileImage,
      coupon: couponCode,
    });

    // Create new coupon
    const coupon = new Coupon({
      code: couponCode,
      discountPercent: 10, // Example discount
      valid: 'ALL_TIME_APPLY', // Ensure this matches one of the enum values
      usedBy: [userId] // Make sure to use an array
    });

    // Save user and coupon
    await newUser.save();
    await coupon.save();

    // Initialize wishlist for the new user
    const wishlist = new Wishlist({ userId });
    await wishlist.save();

    // Send coupon email
    await sendCouponEmail(email, couponCode, username);

    res.status(201).json({ userId, message: 'User created successfully and coupon sent.' });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ error: 'An error occurred during sign-up. Please try again.' });
  }
});




const sendCouponEmail = async (email, couponCode, username) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    port: 465,
    host: 'smtp.gmail.com',
    secure: false, // Use TLS
    tls: {
      rejectUnauthorized: false, // For self-signed certificates
    },
  });

  const mailOptions = {
    from: 'teampanther4@gmail.com',
    to: email,
    subject: 'Welcome! Here is your coupon code',
    html: `
      <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
        <h1 style="font-size: 22px; font-weight: 500; color: #854CE6; text-align: center; margin-bottom: 30px;">Verify Your Account</h1>
        <div style="background-color: #FFF; border: 1px solid #e5e5e5; border-radius: 5px; box-shadow: 0px 3px 6px rgba(0,0,0,0.05);">
          <div style="background-color: #854CE6; border-top-left-radius: 5px; border-top-right-radius: 5px; padding: 20px 0;">
            <h2 style="font-size: 28px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 10px;">Thank you for signing up!</h2>
            <h1 style="font-size: 32px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 20px;">${couponCode}</h1>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Dear ${username},</p>
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Thank you for creating an account. Use the following coupon code to get a discount:</p>
            <p style="font-size: 20px; font-weight: 500; color: #666; text-align: center; margin-bottom: 30px; color: #854CE6;">${couponCode}</p>
            <p style="font-size: 12px; color: #666; margin-bottom: 20px;">If you did not create an account, please disregard this email.</p>
          </div>
        </div>
        <br>
        <p style="font-size: 16px; color: #666; margin-bottom: 20px; text-align: center;">Best regards,<br>The Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent.');
  }
};


// Utility function to generate a coupon code
function generateCouponCode() {
  // Define a prefix for the coupon code
  const prefix = 'WELCOME';
  // Generate a random 4-digit number
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  // Combine prefix and random number to create the coupon code
  const couponCode = `${prefix}${randomNumber}`;
  return couponCode;
}

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    let admin = await Admin.findOne({ email });
    let isMatch, token, userData;

    if (!user && !admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const entity = user || admin;
    isMatch = await bcrypt.compare(password, entity.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    entity.lastLogin = new Date();
    await entity.save();
    token = generateToken(entity.userId);
    userData = {
      userId: entity.userId,
      username: entity.username,
      email: entity.email,
      mobileNumber: entity.mobileNumber,
      streetAddress: entity.streetAddress,
      townCity: entity.townCity,
      pincode: entity.pincode,
      profileImage: entity.profileImage,
      lastLogin: entity.lastLogin,
      role: user ? 'user' : 'admin',
    };

    res.json({ user: userData, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login. Please try again.' });
  }
});


// app.post('/auth/login', async (req, res) => {
//   const { email, password } = req.body;
  
//   try {
//     // First, try to find a User with the provided email
//     let entity = await User.findOne({ email });

//     // If no User found, check if the email belongs to an Admin
//     if (!entity) {
//       entity = await Admin.findOne({ email });
//       if (!entity) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }
//     }

//     // Verify the password
//     const isMatch = await bcrypt.compare(password, entity.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Update last login timestamp
//     entity.lastLogin = new Date();
//     await entity.save();

//     // Prepare user data to send in response
//     const userData = {
//       userId: entity.userId, // Assuming userId is a common field between User and Admin
//       username: entity.username,
//       email: entity.email,
//       mobileNumber: entity.mobileNumber,
//       streetAddress: entity.streetAddress,
//       townCity: entity.townCity,
//       pincode: entity.pincode,
//       profileImage: entity.profileImage,
//       lastLogin: entity.lastLogin,
//       role: entity instanceof User ? 'user' : 'admin', // Check the instance to determine the role
//     };

//     // Generate token using userId
//     const token = generateToken(entity.userId);

//     // Send response with user data and token
//     res.json({ user: userData, token });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'An error occurred during login. Please try again.' });
//   }
// });

// // Function to generate JWT token
// function generateToken(userId) {
//   return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust expiration as needed
// }


app.put('/api/user', upload.single('profileImage'), async (req, res) => {
  const { _id, mobileNumber, streetAddress, townCity, pincode, username, email } = req.body;

  try {
    let user = await User.findById(_id);
    let admin = await Admin.findById(_id);

    if (!user && !admin) {
      return res.status(404).json({ message: 'User not found' });
    }

    const entity = user || admin;

    entity.username = username;
    entity.email = email;
    entity.mobileNumber = mobileNumber;
    entity.streetAddress = streetAddress;
    entity.townCity = townCity;
    entity.pincode = pincode;

    if (req.file) {
      entity.profileImage = req.file.path;
    }

    await entity.save();
    res.json({ message: 'Profile updated successfully', entity });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'An error occurred while updating profile' });
  }
});


// In-memory store for OTPs
const otpStore = {};

// Generate OTP and send email
app.get('/api/generateOTP', async (req, res) => {
  const { email, username, reason } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
  otpStore[email] = otp;

  const mailOptions = {
    from: 'teampanther4@gmail.com',
    to: email,
    subject: reason === 'FORGOTPASSWORD' ? 'Forgot Password OTP' : 'Account Verification OTP',
    html: `
      <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
        <h1 style="font-size: 22px; font-weight: 500; color: #854CE6; text-align: center; margin-bottom: 30px;">Verify Your Account</h1>
        <div style="background-color: #FFF; border: 1px solid #e5e5e5; border-radius: 5px; box-shadow: 0px 3px 6px rgba(0,0,0,0.05);">
          <div style="background-color: #854CE6; border-top-left-radius: 5px; border-top-right-radius: 5px; padding: 20px 0;">
            <h2 style="font-size: 28px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 10px;">Verification Code</h2>
            <h1 style="font-size: 32px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 20px;">${otp}</h1>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Dear ${username},</p>
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Thank you for creating an account. To activate your account, please enter the following verification code:</p>
            <p style="font-size: 20px; font-weight: 500; color: #666; text-align: center; margin-bottom: 30px; color: #854CE6;">${otp}</p>
            <p style="font-size: 12px; color: #666; margin-bottom: 20px;">Please enter this code in the app to activate your account.</p>
            <p style="font-size: 12px; color: #666; margin-bottom: 20px;">If you did not create an account, please disregard this email.</p>
          </div>
        </div>
        <br>
        <p style="font-size: 16px; color: #666; margin-bottom: 20px; text-align: center;">Best regards,<br>The Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});


// Validate OTP
app.post('/api/validateOTP', (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] && otpStore[email] === otp) {
    res.status(200).json({ message: 'OTP validated successfully' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
});


// Endpoint to get user's email by ID
app.get('/api/getUserEmailById/:userId', async (req, res) => {
  try {
    // Extract userId from request parameters
    const { userId } = req.params;

    // Find the user in the database by their ID
    const user = await User.findById(userId);

    // If user is found, return their email
    if (user) {
      return res.status(200).json({ userId: userId, email: user.email });
    } else {
      // If user is not found, return a 404 error
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // If an error occurs, return a 500 error
    console.error("Error fetching user email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to reset password
app.post('/api/resetPassword', async (req, res, next) => {
  // Extract email and password from request body
  const { email, password, username } = req.body;

  try {
    // Find the user in the database by their email
    const user = await User.findOne({ email });

    // If user is found, proceed with resetting the password
    if (user) {
      // Update the user's password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      await User.updateOne({ email }, { $set: { password: hashedPassword } });

      // Send email notification about password update
      const mailOptions = {
        from: 'teampanther4@gmail.com',
        to: email,
        subject: 'Password Reset Successful',
        html: `
            <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
              <h1 style="font-size: 22px; font-weight: 500; color: #854CE6; text-align: center; margin-bottom: 30px;">Unicoderr Account</h1>
              <div style="background-color: #FFF; border: 1px solid #e5e5e5; border-radius: 5px; box-shadow: 0px 3px 6px rgba(0,0,0,0.05);">
                <div style="background-color: #854CE6; border-top-left-radius: 5px; border-top-right-radius: 5px; padding: 20px 0;">
                  <h2 style="font-size: 28px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 10px;">Password Reset Successful</h2>
                </div>
                <div style="padding: 30px;">
                  <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Dear ${username},</p>
                  <p style="font-size: 14px; color: #666; margin-bottom: 20px;"> You can use this as the opening line of the email to greet the user by their name before conveying the message about the successful password reset. </p>
                </div>
              </div>
              <br>
              <p style="font-size: 16px; color: #666; margin-bottom: 20px; text-align: center;">Best regards,<br>Unicoderr Team</p>
            </div>

      `
      };

      await transporter.sendMail(mailOptions);

      // Return success response
      return res.status(200).json({ message: "Password reset successfully" });
    } else {
      // If user is not found, return a 404 error
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    next(error);
  }
});


// Route to handle contact form submission
app.post('/api/contact', async (req, res) => {
  const { username, email, phone, message } = req.body;

  const mailOptions = {
    from: 'teampanther4@gmail.com',
    to: email, // User's email
    subject: 'Contact Form Submission',
    html: `
      <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
        <h1 style="font-size: 22px; font-weight: 500; color: #854CE6; text-align: center; margin-bottom: 30px;">Unicoderr</h1>
        <div style="background-color: #FFF; border: 1px solid #e5e5e5; border-radius: 5px; box-shadow: 0px 3px 6px rgba(0,0,0,0.05);">
          <div style="background-color: #854CE6; border-top-left-radius: 5px; border-top-right-radius: 5px; padding: 20px 0;">
            <h2 style="font-size: 28px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 10px;">Thank you, Have A Nice Day </h2>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Dear ${username},</p>
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;"> Thank you, ${username}, for your message: ${message} </p>
            <p style="font-size: 12px; color: #666; margin-bottom: 20px;">If you did not create an account, please disregard this email.</p>
          </div>
        </div>
        <br>
        <p style="font-size: 16px; color: #666; margin-bottom: 20px; text-align: center;">Best regards,<br>Unicoderr Team</p>
      </div>
    `,
  };

  const ownerMailOptions = {
    from: 'teampanther4@gmail.com',
    to: 'kavinkaviya7@gmail.com', // Shop owner's email
    subject: 'New Contact Form Submission',
    html: `
      <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
        <h1 style="font-size: 22px; font-weight: 500; color: #854CE6; text-align: center; margin-bottom: 30px;">Unicoderr</h1>
        <div style="background-color: #FFF; border: 1px solid #e5e5e5; border-radius: 5px; box-shadow: 0px 3px 6px rgba(0,0,0,0.05);">
          <div style="background-color: #854CE6; border-top-left-radius: 5px; border-top-right-radius: 5px; padding: 20px 0;">
            <h2 style="font-size: 28px; font-weight: 500; color: #FFF; text-align: center; margin-bottom: 10px;">New Contact Form Submission</h2>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;">Dear Shop Owner,</p>
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;"> You have a new message from ${username} (${email}): ${message} </p>
            <p style="font-size: 14px; color: #666; margin-bottom: 20px;"> User Mobile no: ${phone} </p>
          </div>
        </div>
        <br>
        <p style="font-size: 16px; color: #666; margin-bottom: 20px; text-align: center;">Best regards,<br>Unicoderr Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(ownerMailOptions);

    res.status(200).json({ message: 'Emails sent successfully' });
    console.log('Emails sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send emails' });
  }
});


//-----------------------------------------Dashboard--------------------------------------------->



//-----------------------------------------Widget-------------------------------------------->
// Example route to fetch total user count
app.get('/api/totalUserCount', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching total user count:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Example route to fetch total number of user orders
app.get('/api/totalUserOrderCount', async (req, res) => {
  try {
    const orders = await Order.find({ userId: { $exists: true } }); // Assuming orders placed by users have userId
    const totalOrderCount = orders.length;
    res.json({ count: totalOrderCount });
  } catch (error) {
    console.error('Error fetching total user order count:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Route to fetch total bill amount of all orders
app.get('/api/totalBillAmount', async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    // Initialize total bill amount
    let totalBillAmount = 0;

    // Iterate through all orders and sum up the totalAmount field
    orders.forEach(order => {
      totalBillAmount += order.totalAmount; // Updated field name
    });

    // Round the total bill amount to the nearest integer
    totalBillAmount = Math.round(totalBillAmount);

    // Send the total bill amount as response
    res.json({ amount: totalBillAmount });
  } catch (error) {
    console.error('Error fetching total bill amount:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Example route to fetch total balance amount (sum of all user balances)
app.get('/api/totalBalanceAmount', async (req, res) => {
  try {
    const users = await User.find();
    let totalBalance = 0;
    users.forEach(user => {
      totalBalance += parseFloat(user.balance || 0); // Assuming each user has a 'balance' field
    });
    res.json({ amount: totalBalance });
  } catch (error) {
    console.error('Error fetching total balance amount:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//-----------------------------------------Features-------------------------------------------->


// Endpoint to fetch last week's revenue
app.get('/api/lastWeekRevenue', async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const orders = await Order.find({ orderDate: { $gte: oneWeekAgo } });
    let totalAmount = 0;
    orders.forEach(order => {
      totalAmount += Math.round(order.totalBillAmount);
    });
    res.json({ amount: totalAmount });
  } catch (error) {
    console.error('Error fetching last week revenue:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint to fetch last month's revenue
app.get('/api/lastMonthRevenue', async (req, res) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const orders = await Order.find({ orderDate: { $gte: oneMonthAgo } });
    let totalAmount = 0;
    orders.forEach(order => {
      totalAmount += Math.round(order.totalBillAmount);
    });
    res.json({ amount: totalAmount });
  } catch (error) {
    console.error('Error fetching last month revenue:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint to fetch target revenue (for demonstration purposes)
app.get('/api/targetRevenue', async (req, res) => {
  try {
    const targetRevenue = 20000; // Example target value
    res.json({ amount: targetRevenue });
  } catch (error) {
    console.error('Error fetching target revenue:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


//-----------------------------------------Charts--------------------------------------------->

// Generate dummy data function
const generateDummyData = () => {
  const currentMonth = new Date().getMonth(); // Get current month (0-indexed)
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dummyData = [];
  
  // Generate data for the last 6 months
  for (let i = 0; i < 6; i++) {
    const monthIndex = (currentMonth - i + 12) % 12; // Ensure positive month index
    const monthName = months[monthIndex];
    const totalRevenue = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000; // Generate random revenue between 1000 to 3000
    dummyData.unshift({ name: monthName, Total: totalRevenue }); // Add to beginning of array to maintain chronological order
  }
  
  return dummyData;
};

// Fetch revenue data
app.get('/api/revenue', async (req, res) => {
  try {
    // Fetch revenue data from MongoDB
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' }, // Group by month
          totalRevenue: { $sum: '$totalAmount' } // Sum total amount for each month (use totalAmount if that's the field used)
        }
      },
      {
        $sort: { _id: 1 } // Sort by month
      }
    ]);

    // Format the data to match the frontend expectations
    const formattedData = revenueData.map(item => ({
      name: new Date(0, item._id - 1).toLocaleString('default', { month: 'long' }), // Convert month number to month name
      Total: Math.round(item.totalRevenue)
    }));

    // Combine real and dummy data for the last 6 months
    const dummyData = generateDummyData();
    const finalData = dummyData.concat(formattedData.slice(-6)); // Combine dummy data and last 6 months of real data

    res.json(finalData);
  } catch (error) {
    console.error('Error fetching revenue data', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


//-----------------------------------------Users--------------------------------------------->

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;
  // console.log(`Received userId: ${userId}`); // Log received userId
  try {
    const deletedUser = await User.findByIdAndDelete(userId); // Use findByIdAndDelete if userId is the _id
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//-----------------------------------------Orders--------------------------------------------->


// GET all orders
app.get('/api/orders/all', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// DELETE an order by orderId
app.delete('/api/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    await Order.findByIdAndDelete(orderId);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order' });
  }
});

app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update order status
app.put('/api/orders/:orderId/status', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//-----------------------------------------Products--------------------------------------------->


// Endpoint to fetch all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// // Function to read slider data from JSON file
// const getSliderData = () => {
//   const filePath = path.join(__dirname, 'data/sliderData.json');
//   try {
//     const data = fs.readFileSync(filePath, 'utf8');
//     return JSON.parse(data);
//   } catch (error) {
//     console.error('Error reading slider data:', error);
//     throw new Error('Could not read slider data');
//   }
// };

// // Serve slider data
// app.get('/api/sliders', (req, res) => {
//   try {
//     const sliderData = getSliderData();
//     res.json(sliderData);
//   } catch (error) {
//     console.error('Error in /api/sliders endpoint:', error);
//     res.status(500).json({ message: 'Error reading slider data' });
//   }
// });

// // API endpoint to create a new slider (this will save to the JSON file)
// app.post('/api/sliders', (req, res) => {
//   try {
//     const sliderData = getSliderData();
//     const newSlider = req.body;
//     sliderData.push(newSlider);
//     fs.writeFileSync(path.join(__dirname, 'data/sliderData.json'), JSON.stringify(sliderData, null, 2));
//     res.status(201).json(newSlider);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // API endpoint to update a slider (this will save to the JSON file)
// app.put('/api/sliders/:id', (req, res) => {
//   try {
//     const sliderData = getSliderData();
//     const sliderIndex = sliderData.findIndex(slider => slider._id === req.params.id);
//     if (sliderIndex === -1) {
//       return res.status(404).json({ message: 'Slider not found' });
//     }
//     const updatedSlider = { ...sliderData[sliderIndex], ...req.body };
//     sliderData[sliderIndex] = updatedSlider;
//     fs.writeFileSync(path.join(__dirname, 'data/sliderData.json'), JSON.stringify(sliderData, null, 2));
//     res.json(updatedSlider);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// // API endpoint to fetch products
// app.get('/api/products', (req, res) => {
//   try {
//     res.json(products);
//     console.log(products)
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
