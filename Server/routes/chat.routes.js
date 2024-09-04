import { Router } from 'express';
import chatController from '../controllers/chat.controller.js';
import messageController from '../controllers/message.controller.js';
import tokenValidator from '../middleware/tokenValidator.js';

const chatRoutes = Router();

chatRoutes.get('/', tokenValidator, chatController.getAllChats);
chatRoutes.get('/:chatId/messages', tokenValidator, chatController.getChatMessages);
chatRoutes.post('/new', tokenValidator, chatController.createChat);
chatRoutes.post('/send', tokenValidator, messageController.sendMessage);

export default chatRoutes;
