import Developer from '../models/developers.model.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

const SECRETKEY = process.env.SECRETKEY;

const developersController = {
    getAll :async (req,res) => {
        console.log('U are attempting the get all developers');
        try{
            const developers = await Developer.find();
            return res.status(200).json(developers);
        }catch(error){
            return res.status(400).json(error);
        }
    },
    getOne :async (req,res) => {
        console.log('U are attempting the get one developer');
        const {email} = req.params;
        try{
            const developerFound = await Developer.findOne({email});
            if(!developerFound){
                return res.status(404).json({message: 'The developer was not found'});
            }
            return res.status(200).json(developerFound);
        }catch(error){
            return res.status(400).json(error);
        }
    },
    createOne :async (req,res) => {
        console.log(req.body);
        const {firstName, lastName, email, password, confirmPassword, country, stageOfCompletion} = req.body;
        const newDeveloper = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            country,
            stageOfCompletion
        }
        try{
            const developerSaved = await Developer.create(newDeveloper);
            const infoToken= {
                firstName: developerSaved.firstName,
                lastName: developerSaved.lastName,
                email: developerSaved.email,
                stageOfCompletion: developerSaved.stageOfCompletion,
                id : developerSaved._id
            }
            jwt.sign(infoToken, SECRETKEY, {expiresIn: "15m"}, (error, token) => {
                if(error){
                    return res.status(400).json({message: 'Error generating token'});
                }
                return res.status(201).json({token});
            });

        }catch(error){
            if (error.code === 11000) {
                return res.status(400).json({ errors: { email: {message: "The email is already registered"} } });
            } 
            console.log(error)
            return res.status(400).json(error);
        }
    },
    updateOne :async (req,res) => {
        const {languages, bio, github, stageOfCompletion} = req.body;
        const email = req.params.email;
        const dataToBeUpdated = {};
        if(languages){
            dataToBeUpdated.languages = languages;
        }
        if(bio){
            dataToBeUpdated.bio = bio;
        }
        if(github){
            dataToBeUpdated.github = github;
        }
        if(stageOfCompletion){
            dataToBeUpdated.stageOfCompletion = stageOfCompletion;
        }
        try{
            const developerUpdated = await Developer.findOneAndUpdate({email}, dataToBeUpdated, {new: true, runValidators: true});
            console.log(developerUpdated);
            if(!developerUpdated){
                return res.status(404).json({message: 'The developer was not found'});
            }
            const infoToken= {
                firstName: developerUpdated.firstName,
                lastName: developerUpdated.lastName,
                email: developerUpdated.email,
                stageOfCompletion: developerUpdated.stageOfCompletion,
                id : developerUpdated._id
            }
            jwt.sign(infoToken, SECRETKEY, {expiresIn: "15m"}, (error, token) => {
                if(error){
                    return res.status(400).json({message: 'Error generating token'});
                }
                return res.status(201).json({token: token, developerUpdated : developerUpdated});
            });
        }catch(error){
            return res.status(400).json(error);
        }

    },
    deleteOne :async (req,res) => {},
    login :async (req,res) => {
        const {email,password} = req.body;
        try{
            const currentUser = await Developer.findOne({email});
            if(!currentUser){
                return res.status(400).json({ errors: { email: {message: "We could not find the email address u entered"} } });
            }

            const validPassword = await bcrypt.compare(password, currentUser.password);
            if(!validPassword){
                return res.status(400).json({ errors: { password: {message: "The password u entered is incorrect"} } });
            }
            ///Jason token generation
            const infoToken = {
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
                stageOfCompletion: currentUser.stageOfCompletion,
                id : currentUser._id
            }
            jwt.sign(infoToken, SECRETKEY, {expiresIn: "15m"}, (error, token) => {
                    if(error){
                        return res.status(400).json({message: 'Error generating token'});
                    }
                    return res.status(201).json({token});
                }
            )
            /// End of jason token generation

        }catch(error){
            return res.status(400).json(error);
        }
    },

};

export default developersController;