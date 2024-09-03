import { Router } from "express";
import chatsController from "../controllers/chats.controller.js";

const chatsRoutes = Router();

//Routes

chatsRoutes.post('/send', chatsController.sendMessage);
chatsRoutes.get('/receive', chatsController.getMessages);

export default chatsRoutes;