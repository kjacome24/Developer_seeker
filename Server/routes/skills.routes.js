import {Router} from 'express';
import skillsController from '../controllers/skills.controller.js';

const skillsRoutes = Router();

//Routes

skillsRoutes.get('/', skillsController.getAllSkills);
skillsRoutes.post('/new', skillsController.createSkill);
skillsRoutes.get('/:name', skillsController.getOne);

export default skillsRoutes;