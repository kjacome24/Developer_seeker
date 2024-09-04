import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    participants: [
        {
            type: String, // Store participant emails as strings
            required: true,
        },
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message', // Reference to the most recent message
    },
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;