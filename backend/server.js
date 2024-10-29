import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io"; // Correctly import as named import
import productRoutes from "./routes/productRoutes.js"; 
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
const io = new Server(server, { // Use 'new Server' instead of 'socketIO'
    cors: {
        origin: "*"
    }
});

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up socket connection
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Use the product routes
app.use("/api/products", productRoutes(io)); // Pass io to product routes

// Example of a notification endpoint (if needed)
app.post("/api", (req, res) => {
    const { name, message } = req.body;
    io.emit('notification', { name, message });
    console.log(name, message);
    res.status(200).json({ name, message });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
