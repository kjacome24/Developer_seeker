import Message from "../models/chat.model.js";

const chatsController = {

sendMessage : async (req, res) => {
    const { senderId, receiverId, message: content } = req.body;

    try {
        const message = new Message({
            sender: senderId,
            receiver: receiverId,
            message: content
        });

        await message.save();
        return res.status(201).json({ message: 'Message sent successfully', data: message });
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
},

    getMessages : async (req, res) => {
        const { user1, user2 } = req.query;
    
        try {
            const messages = await Message.find({
                $or: [
                    { sender: user1, receiver: user2 },
                    { sender: user2, receiver: user1 }
                ]
            }).sort({ timestamp: 1 });
    
            return res.status(200).json({ messages });
        } catch (error) {
            console.error('Error fetching messages:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
}

};


export default chatsController;