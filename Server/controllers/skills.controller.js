import {Skill} from '../models/skills.model.js';


const skillsController = {
    createSkill: async (req, res) => {
        console.log(req.body);
        const {name, image, languageOrFramework} = req.body;
        const newSkill = {
            name,
            image,
            languageOrFramework
        }
        try{
            const skillSaved = await Skill.create(newSkill);
            return res.status(201).json(skillSaved);
        }catch(error){
            if (error.code === 11000) {
                return res.status(400).json({ errors: { name: {message: "The skill is already registered"} } });
            } 
            return res.status(400).json(error);
        }
    },
    getAllSkills: async (req, res) => {
        try {
            const skills = await Skill.find();
            res.status(200).json(skills);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getOne: async (req, res)=> {
        const name = req.params.name;
        try {
            const skillFound = await Skill.findOne({name});
            if(!skillFound){
                return res.status(404).json({message: 'Skill not found'});
            }
            return res.status(200).json(skillFound);
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}

export default skillsController;