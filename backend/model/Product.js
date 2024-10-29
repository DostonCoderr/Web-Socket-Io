import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);

// Ensure you are exporting the model correctly
export default Product; // Use default export
