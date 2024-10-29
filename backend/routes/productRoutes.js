import express from "express";
import fs from "fs"; // Import file system module
import path from "path"; // Import path module
import Product from "../model/Product.js"; // Ensure the correct path and extension

const router = express.Router();

// Ensure this folder exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Export the routes and use socket.io for real-time notifications
export default (io) => {
    // Add a new product
    // Assuming you are in your productRoutes.js
router.post("/", async (req, res) => {
  console.log("Request body:", req.body); // Log the request body
  console.log("File info:", req.file); // Log the uploaded file info

  const product = new Product({
      name: req.body.name,
      description: req.body.message, // Update to match your frontend form
      size: req.body.size,
      image: req.file ? req.file.filename : null // Ensure file exists before accessing filename
  });

  try {
      const savedProduct = await product.save();
      io.emit("newProduct", savedProduct); // Emit event for new product
      res.status(201).json(savedProduct);
  } catch (err) {
      console.error("Error saving product:", err); // Log the error for debugging
      res.status(400).json({ message: err.message });
  }
});


    return router;
};
