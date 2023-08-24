const express = require("express");
const router = express.Router();

const { 
    validateCreateBlog
} = require("../middleware/blogValidator");

const {
    createBlog, getBlogs
} = require("../controllers/blogController");

router.route("/create").post(validateCreateBlog, createBlog);
router.route("/get").get(getBlogs);
router.route("/get/:id").get(getBlog);




module.exports = router;