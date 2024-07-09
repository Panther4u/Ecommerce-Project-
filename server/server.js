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




// POST endpoint for checkout
app.post('/api/checkout', async (req, res) => {
  try {
    const {
      userId,
      cartProducts,
      billingDetails,
      deliveryMethod,
      totalBillAmount, // Ensure totalBillAmount is received from frontend
    } = req.body;

    // Create new order instance
    const newOrder = new Order({
      userId,
      orderedProducts: cartProducts,
      billingInfo: billingDetails,
      totalProducts: cartProducts.length,
      deliveryMethod,
      totalBillAmount, // Include totalBillAmount in the order
    });

    // Save the order to MongoDB
    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Error placing order' });
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
    const orders = await Order.find();
    let totalBillAmount = 0;

    // Iterate through all orders and sum up the total bill amount
    orders.forEach(order => {
      totalBillAmount += order.totalBillAmount;
    });

    // Round the total bill amount to the nearest integer
    totalBillAmount = Math.round(totalBillAmount);

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

// Route to fetch revenue data
app.get('/api/revenue', async (req, res) => {
  try {
    // Fetch real revenue data from MongoDB
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' }, // Group by month
          totalRevenue: { $sum: '$totalBillAmount' } // Sum total bill amount for each month
        }
      },
      {
        $sort: { _id: 1 } // Sort by month
      }
    ]);

    // Format the data to match the frontend expectations
    const formattedData = revenueData.map(item => ({
      name: new Date(0, item._id - 1).toLocaleString('default', { month: 'long' }), // Convert month number to month name
      Total:  Math.round(item.totalRevenue)
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


// GET endpoint to fetch all orders for a specific user
app.get('/api/orders', async (req, res) => {
  const { userId } = req.query; // Get userId from query parameters
  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }); // Fetch orders by userId and sort by creation date
    res.status(200).json(orders); // Respond with JSON array of orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// DELETE endpoint to delete an order by orderId
app.delete('/api/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    await Order.findByIdAndDelete(orderId);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order' });
  }
});

// Fetch order details by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('orderedProducts'); // Assuming orderedProducts is an array of references to product documents

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Error fetching order details' });
  }
});

// GET order details by ID
app.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: 'Invalid Order ID' });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
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
