import {Router} from 'express';
import positionsController from '../controllers/positions.controller.js';

const positionRoutes = Router();

//Routes

positionRoutes.get('/', positionsController.getAll);
positionRoutes.post('/new', positionsController.createPosition);
positionRoutes.get('/:id', positionsController.getOne);

export default positionRoutes;