const Blog = require("../models/blog");

const multer = require('multer');


const createBlog = async (req, resp) => {
  try {
      const { title, description, image, cloudinary } = req.body;
      const creatBlog = new Blog({
        title: title, 
        description:description,
        image: cloudinary ? cloudinary : image,
      });
      await creatBlog.save();
      if (!createBlog) {
          return resp.status(500).json({ error: 'Error Occured While adding Product' });
      }
      return resp.status(201).json({ message: "Blog added successfully", blog: creatBlog })
  } catch (error) {
      return resp.status(500).json({ error: error.message || 'Internal Server Error! ' });
        }
    }

getBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter
  const perPage = parseInt(req.query.per_page) || 8; // Number of blogs per page

  try {
    const totalBlogs = await Blog.countDocuments();
    const totalPages = Math.ceil(totalBlogs / perPage);
    const blogs = await Blog.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    return res.status(200).json({ blogs, totalPages });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

getBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findById(blogId); // Find a blog post by its ID in the database

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    return res.status(200).json({ blog });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createBlog, getBlogs, getBlog };
