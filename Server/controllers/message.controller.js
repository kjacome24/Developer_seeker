import Message from '../models/message.model.js';
import Chat from '../models/chat.model.js';

const messageController = {
    sendMessage: async (req, res) => {
        const { chatId, content, senderEmail } = req.body;

        try {
            const newMessage = await Message.create({
                chat: chatId,
                sender: senderEmail,
                content,
            });

            await Chat.findByIdAndUpdate(chatId, { lastMessage: newMessage._id });

            res.status(201).json(newMessage);
        } catch (error) {
            res.status(500).json({ error: 'Failed to send message' });
        }
    },
};

export default messageController;
