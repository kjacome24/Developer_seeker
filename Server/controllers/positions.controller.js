import Position from '../models/positions.model.js';
import { Employer } from '../models/employers.model.js';




const positionsController = {
    getAll: async (req, res) => {
        console.log('You are attempting to get all positions');
        try {
            const positions = await Position.find(); // Use Position model
            return res.status(200).json(positions);
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    getOne: async (req, res) => {
        console.log('You are attempting to get one position');
        const { id } = req.params; // Access the id from req.params
        try {
            const positionFound = await Position.findById(id); // Query by _id
            if (!positionFound) {
                return res.status(404).json({ message: 'Position not found' });
            }
            return res.status(200).json(positionFound);
        } catch (error) {
            return res.status(400).json(error);
        }
    },
    createPosition: async (req, res) => {
        console.log('You are attempting to create a position');
        const { namePosition, jobDescription, languages, email } = req.body;

        try {
            const employer = await Employer.findOne({email});
            console.log(employer);
            if (!employer) {
                return res.status(404).json({ message: 'Employer not found' });
            }
            employer.confirmPassword = employer.password;
            const newPosition = {
                namePosition,
                jobDescription,
                languages,
                company : employer
            };
            const positionSaved = await Position.create(newPosition);
            return res.status(201).json(positionSaved);
        } catch(error){
            return res.status(400).json(error);
        }
    },


};

export default positionsController;

