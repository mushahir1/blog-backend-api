const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 2000;

const connectionString = 

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// mongoose.connect("mongodb://localhost:27017/new_blog", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Simulated user database (replace this with an actual database)
// const users = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,resp)=>{
  return resp.status(200).json({
    message :'web is running'
  })
})
// app.use('/user',userRoutes)
app.use("/user", require("./routes/userRoutes"));
app.use("/blog", require("./routes/blogRoutes"));
// Start the Express server
// const port = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
