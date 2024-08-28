import {Router} from 'express';
import developersController from '../controllers/developers.controller.js';
import tokenValidator from '../middleware/tokenValidator.js';

const developersRoutes = Router();

////Routes

developersRoutes.get('/', tokenValidator, developersController.getAll);
developersRoutes.get('/:email',tokenValidator, developersController.getOne);
developersRoutes.post('/new', developersController.createOne);
developersRoutes.put('/:email',tokenValidator, developersController.updateOne);
developersRoutes.delete('/:email',tokenValidator, developersController.deleteOne);
developersRoutes.post('/login', developersController.login);

export default developersRoutes;