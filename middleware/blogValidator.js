const { body, validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2; // Import Cloudinary SDK
cloudinary.config({ 
  cloud_name: '', 
  api_key: '', 
  api_secret: '' 
});
cloudinary.config({ 
    cloud_name: '', 
    api_key: '', 
    api_secret: '' 
  });
// Create Blog Validation
const validateCreateBlog = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 80 }).withMessage('Title must be between 3 and 80 characters'),
    body('description').notEmpty().withMessage('Description is required'),
    body('image')
        .notEmpty()
        .custom(async (value, { req }) => {
            if (!value) {
                // console.log('fdgghjdhjbdk',uploadedImage)
                return true; // Skiping validation if value is not provided means that image is not available
            }
            // Uploading the image to Cloudinary
            const uploadedImage = await cloudinary.uploader.upload(value, { folder: 'blogs' });
            if (!uploadedImage) {
                throw new Error('Error while uploading image to cloudinary');
            }

            // Saving the Cloudinary image URL to req.body.image
            // console.log(uploadedImage.secure_url)
            req.body.cloudinary = uploadedImage.secure_url;

            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        const errMessage = errors.array().map(error => error.msg);
        return res.status(422).json({ message: errMessage });
    }
];

module.exports = { validateCreateBlog };
