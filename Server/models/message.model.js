import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat', // Reference to the chat this message belongs to
        required: true,
    },
    sender: {
        type: String, // Store sender email as a string
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;

