const User = require("../models/users");
const bcrypt = require("bcrypt");


// Register endpoint

   const registerUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' });
      }
  
      // Hash the password before storing
      const saltRounds = 10; // You can adjust the number of salt rounds as needed
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user with the hashed password and store it in the simulated database
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
  
      return res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Login endpoint
 const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user with the provided email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = { registerUser, loginUser };