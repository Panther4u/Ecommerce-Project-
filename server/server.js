// Import required modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('./config/passport');
const validator = require('validator');
const otpGenerator = require("otp-generator");
const nodemailer = require('nodemailer');
const path = require('path'); 
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // Import UUID library
const generateToken = require('./utils/generateToken');
const fs = require('fs');
const { User, Coupon } = require('./model/User'); 
const Order = require('./model/orderModel');
const Admin = require('./model/Admin');

// Create Express app
const app = express();

// Allow requests from localhost:5173 (your frontend)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Serve static files (images) from the 'images' directory
// app.use('/images', express.static('images'));



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error("MongoDB connection error:", error));



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
const sendCouponEmail = (email, couponCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    },
    port: 465,
    host: "smtp.gmail.com"
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Welcome! Here is your coupon code',
    text: `Thank you for signing up! Use the following coupon code to get a discount: ${couponCode}`,
  };

  return transporter.sendMail(mailOptions);
  
};

// Utility function to generate a coupon code
function generateCouponCode() {
  const uuid = uuidv4();
  const alphanumeric = uuid.replace(/-/g, '').substr(0, 24);
  const couponCode = `COUPON${alphanumeric}`;
  return couponCode;
}

// // Generate a coupon for a new user
// app.post('/api/generate-coupon', async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const existingCoupon = await Coupon.findOne({ userId: userId });

//     if (existingCoupon) {
//       return res.status(400).json({ message: 'Coupon already generated for this user.' });
//     }

//     const couponCode = generateCouponCode();
//     const coupon = new Coupon({
//       coupon: couponCode,
//       discountPercent: 10, // Example: 10% discount
//       validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Valid for 30 days
//       userId: userId,
//     });

//     await coupon.save();
//     res.status(201).json({ couponCode });
//   } catch (error) {
//     console.error('Error generating coupon:', error);
//     res.status(500).json({ message: 'Failed to generate coupon. Please try again later.' });
//   }
// });

// // Apply a coupon

// app.post('/api/apply-coupon', async (req, res) => {
//   try {
//     const { userId, couponCode } = req.body;

//     if (!userId || !couponCode) {
//       return res.status(400).json({ success: false, message: 'Missing userId or couponCode.' });
//     }

//     const coupon = await Coupon.findOne({ coupon: couponCode });

//     if (!coupon || coupon.userId !== userId|| coupon.usedAt) {
//       return res.status(400).json({ success: false, message: 'Invalid or expired coupon code.' });
//     }

//     const discount = coupon.discountPercent / 100;

//     coupon.usedAt = new Date();
//     await coupon.save();

//     res.status(200).json({ success: true, discount });
//   } catch (error) {
//     console.error('Error applying coupon:', error);
//     res.status(500).json({ message: 'Failed to apply coupon. Please try again later.' });
//   }
// });

app.post('/apply-coupon', async (req, res) => {
  const { userId, couponCode, discountPercentage } = req.body;

  try {
    // Check if the coupon code is valid and not expired
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      return res.status(400).json({ error: 'Invalid coupon code.' });
    }

    if (coupon.usedBy !== userId) {
      return res.status(400).json({ error: 'Coupon code does not belong to this user.' });
    }

    if (coupon.validUntil < new Date()) {
      return res.status(400).json({ error: 'Coupon code has expired.' });
    }

    // If coupon is valid, calculate discount percentage
    const discountPercentage = coupon.discountPercent; // Assuming `discount` is a percentage value

    // Proceed with applying the discount logic in your application

    res.json({ discountPercentage, message: 'Coupon applied successfully.' });
  } catch (error) {
    console.error('Error applying coupon:', error);
    res.status(500).json({ error: 'An error occurred while applying the coupon.' });
  }
});

app.get('/coupons/discount/:code', async (req, res) => {
  const couponCode = req.params.code;

  try {
    // Find the coupon by code and project only the discountPercent field
    const coupon = await Coupon.findOne({ code: couponCode }).select('discountPercent');

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found.' });
    }

    // If found, return the discount percentage
    res.json({ discountPercent: coupon.discountPercent });

  } catch (error) {
    console.error('Error retrieving discount percentage:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the discount percentage.' });
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




// API endpoint to get user profile image
app.get('/api/users/:username/profile-image', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming profileImage is a URL
    const { profileImage } = user;
    res.json({ profileImage });
  } catch (error) {
    console.error('Error fetching profile image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.get("/api/user/save-billing", async (req, res) => {
  try {
    const user = await User.findOne(); // Fetch the first user document
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/user/save-billing', async (req, res) => {
  const { _id, firstName, streetAddress, townCity, apartment, pincode, mobileNumber } = req.body;

  try {
    // Validate _id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    // Find user by userId and update billing information
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's billing information
    user.firstName = firstName;
    user.streetAddress = streetAddress;
    user.townCity = townCity;
    user.apartment = apartment;
    user.pincode = pincode;
    user.mobileNumber = mobileNumber;

    // Save updated user
    await user.save();

    // Respond with success message
    res.status(200).json({ message: 'Billing information saved successfully' });
  } catch (error) {
    console.error('Error saving billing information:', error);
    res.status(500).json({ message: 'Error saving billing information' });
  }
});



// app.post('/api/checkout', (req, res) => {
//   const billingInfo = req.body;
//   // Perform any necessary actions related to checkout
//   res.json({ message: 'Checkout successful', billingInfo });
// });


// Existing route to save order
app.post('/api/checkout', async (req, res) => {
  const { userId, cartProducts, ...billingValues } = req.body;

  try {
    // Create a new order instance based on the model
    const newOrder = new Order({
      userId,
      orderedProducts: cartProducts,
      billingInfo: billingValues
    });

    // Save the order to the database
    await newOrder.save();
    console.log('Order saved successfully');

    // Respond with success message and the new order data
    res.status(201).json({ message: 'Order placed successfully', newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});


app.get('/api/orders', async (req, res) => {
  const { userId } = req.query;
  try {
    const orders = await Order.find({ userId }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching order summary:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// // Fetch billing details for authenticated user
// app.get('/billing-details/:userId', async (req, res) => {
//   try {
//     const billingDetails = await BillingDetails.findOne({ user: req.params.userId });

//     if (!billingDetails) {
//       return res.status(404).json({ message: 'Billing details not found' });
//     }

//     res.json(billingDetails);
//   } catch (error) {
//     console.error('Error fetching billing details:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Save billing details for authenticated user
// router.post('/save-billing', async (req, res) => {
//   const { _id, name, streetAddress, townCity, apartment, pincode, mobileNumber } = req.body;

//   try {
//     let billingDetails = await BillingDetails.findOne({ user: _id });

//     if (!billingDetails) {
//       // Create new billing details entry if none exists
//       billingDetails = new BillingDetails({
//         user: _id,
//         name,
//         streetAddress,
//         townCity,
//         apartment,
//         pincode,
//         mobileNumber,
//       });

//       await billingDetails.save();
//     } else {
//       // Update existing billing details
//       billingDetails.name = name;
//       billingDetails.streetAddress = streetAddress;
//       billingDetails.townCity = townCity;
//       billingDetails.apartment = apartment;
//       billingDetails.pincode = pincode;
//       billingDetails.mobileNumber = mobileNumber;

//       await billingDetails.save();
//     }

//     res.json(billingDetails);
//   } catch (error) {
//     console.error('Error saving billing details:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });




// app.post('/api/checkout', (req, res) => {
//   const billingInfo = req.body;
//   // Perform any necessary actions related to checkout
//   res.json({ message: 'Checkout successful', billingInfo });
// });


// app.post('/auth/signup', upload.single('profileImage'), async (req, res) => {
//   try {
//     const { username, email, password, mobileNumber, addressLine1, addressLine2, pincode } = req.body;
//     const profileImage = req.file ? req.file.path : '';

//     if (!email) {
//       return res.status(400).json({ error: "Email is required." });
//     }

//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ error: "Invalid email address." });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "User with this email already exists." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const userId = uuidv4(); // Generate a UUID for user ID

//     const newUser = new User({
//       userId,
//       username,
//       email,
//       password: hashedPassword,
//       mobileNumber,
//       addressLine1,
//       addressLine2,
//       pincode,
//       profileImage,
//     });

//     await newUser.save();
//     res.status(201).json({ userId, message: "User created successfully." });
//     console.log({ userId, message: "User created successfully." });
//   } catch (error) {
//     console.error("Error during sign-up:", error);
//     res.status(500).json({ error: "An error occurred during sign-up. Please try again." });
//   }
// });


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
// POST /auth/login - User login
app.post('/auth/signup', upload.single('profileImage'), async (req, res) => {
  try {
    const { username, email, password, mobileNumber, streetaddress, towncity, pincode } = req.body;
    const profileImage = req.file ? req.file.path : '';

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const couponCode = generateCouponCode();

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

    const coupon = new Coupon({
      code: couponCode,
      discountPercent: 10, // Example: 10% discount
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Valid for 30 days
      usedBy: userId,
    });

    await newUser.save();
    await coupon.save();

    await sendCouponEmail(email, couponCode);

    res.status(201).json({ userId, message: 'User created successfully and coupon sent.' });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ error: 'An error occurred during sign-up. Please try again.' });
  }
});


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
    token = generateToken(entity._id);
    userData = {
      _id: entity._id,
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
//     // Find user by email
//     let user = await User.findOne({ email });
//     let admin = await Admin.findOne({ email });
//     let isMatch, token, userData;

//     // If neither user nor admin is found, return error
//     if (!user && !admin) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     if (user) {
//       // Compare user password
//       isMatch = await bcrypt.compare(password, user.password);

//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }

//       // Update last login timestamp
//       user.lastLogin = new Date();
//       await user.save();

//       // Generate JWT token
//       token = generateToken(user._id);

//       // Prepare user data
//       userData = {
//         _id: user._id,
//         userId: user.userId,
//         username: user.username,
//         email: user.email,
//         mobileNumber: user.mobileNumber,
//         streetaddress: user.streetaddress,
//         towncity: user.towncity,
//         pincode: user.pincode,
//         profileImage: user.profileImage,
//         lastLogin: user.lastLogin,
//         role: user.role,
//       };
//     } else {
//       // Compare admin password
//       isMatch = await bcrypt.compare(password, admin.password);

//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }

//       // Update last login timestamp
//       admin.lastLogin = new Date();
//       await admin.save();

//       // Generate JWT token
//       token = generateToken(admin._id);

//       // Prepare admin data
//       userData = {
//         _id: admin._id,
//         username: admin.username,
//         email: admin.email,
//         role: admin.role,
//         profileImage: admin.profileImage,
//         lastLogin: admin.lastLogin,
//       };
//     }

//     // Return user or admin data and token
//     res.json({
//       user: userData,
//       token,
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'An error occurred during login. Please try again.' });
//   }
// });

// app.put('/api/user', upload.single('profileImage'), async (req, res) => {
//   const { _id, mobileNumber, addressLine1, addressLine2, pincode, username, email } = req.body;

//   try {
//     let user = await User.findById(_id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.username = username;
//     user.email = email;
//     user.mobileNumber = mobileNumber;
//     user.addressLine1 = addressLine1;
//     user.addressLine2 = addressLine2;
//     user.pincode = pincode;

//     if (req.file) {
//       user.profileImage = req.file.path;
//     }

//     await user.save();

//     res.json({ message: 'User profile updated successfully', user });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     res.status(500).json({ message: 'An error occurred while updating profile' });
//   }
// });

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





//-----------------------------------------Products--------------------------------------------->





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
