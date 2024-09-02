import mongoose from "mongoose"
import Developer from "./developers.model";

const chats = new mongoose.Schema({
    message: {
        type: String,
        required: [true, "Message is required"],
        minlength: [3, "Message must be at least 3 characters long"],
        maxlength: [1000, "Message must be at most 1000 characters long"],
    },
    user_origen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "developers",
    },
    user_destino: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employers",
    },
}, { timestamps: true });
