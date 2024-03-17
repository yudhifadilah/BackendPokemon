import multer from 'multer';
import path from 'path';

// Configuration for storing image files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory for storing image files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Unique filename for the image file
  }
});

// Configure multer to upload images
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limiting image file size (e.g., maximum 5MB)
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb); // Check the file type of the uploaded file (only accept image files)
  }
}).single('image'); // Field name in the form for uploading images

// Function to check the file type of the uploaded file
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/; // Accepted image file types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Only images are allowed!');
  }
}

export default upload; // Export the multer configuration
