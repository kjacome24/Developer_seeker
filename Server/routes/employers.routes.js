import {Router} from 'express';
import employersController from '../controllers/employers.controller.js';
import tokenValidator from '../middleware/tokenValidator.js';

const employersRoutes = Router();

////Routes

employersRoutes.get('/', tokenValidator, employersController.getAll);
employersRoutes.get('/:email',tokenValidator, employersController.getOne);
employersRoutes.post('/new', employersController.createOne);
employersRoutes.put('/:email',tokenValidator, employersController.updateOne);
employersRoutes.delete('/:email',tokenValidator, employersController.deleteOne);
employersRoutes.post('/login', employersController.login);

export default employersRoutes;