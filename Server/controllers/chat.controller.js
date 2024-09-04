import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js';

const chatController = {
    getAllChats: async (req, res) => {
        const userEmail = req.userInformation.email; // Assuming user information is in the request object
        console.log(userEmail);
        try {
            const chats = await Chat.find({ participants: userEmail })
                .populate('lastMessage')
                .exec();
            res.status(200).json(chats);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch chats' });
        }
    },

    getChatMessages: async (req, res) => {
        const chatId = req.params.chatId;
        console.log(chatId);
        try {
            const messages = await Message.find({ chat: chatId }).sort({ createdAt: 1 });
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch messages' });
        }
    },

    createChat: async (req, res) => {
        const { participants } = req.body;
        try {
            const existingChat = await Chat.findOne({ participants: { $all: participants } });

            if (existingChat) {
                return res.status(200).json(existingChat); // Chat already exists
            }

            const newChat = await Chat.create({ participants });
            res.status(201).json(newChat);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create chat' });
        }
    },
};

export default chatController;
