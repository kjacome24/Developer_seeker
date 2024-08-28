import {Employer} from '../models/employers.model.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

const SECRETKEY = process.env.SECRETKEY;

const employersController = {
    getAll :async (req,res) => {
        console.log('U are attempting the get all employers');
        try{
            const employers = await Employer.find();
            return res.status(200).json(employers);
        }catch(error){
            return res.status(400).json(error);
        }
    },
    getOne :async (req,res) => {
        console.log('U are attempting the get one Employer');
        const {email} = req.params;
        try{
            const EmployerFound = await Employer.findOne({email});
            if(!EmployerFound){
                return res.status(404).json({message: 'The Employer was not found'});
            }
            return res.status(200).json(EmployerFound);
        }catch(error){
            return res.status(400).json(error);
        }
    },
    createOne :async (req,res) => {
        console.log(req.body);
        const {orgName, firstName, lastName, email, password, confirmPassword, country, orgAddress} = req.body;
        const newEmployer = {
            orgName,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            country,
            orgAddress
        }
        try{
            const employersaved = await Employer.create(newEmployer);
            const infoToken= {
                orgName: employersaved.orgName,
                firstName: employersaved.firstName,
                lastName: employersaved.lastName,
                email: employersaved.email,
                stageOfCompletion: 5,
                id : employersaved._id
            }
            jwt.sign(infoToken, SECRETKEY, {expiresIn: "1m"}, (error, token) => {
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
        const {orgName, firstName, email, lastName, password, country, orgAddress} = req.body;
        const email_in = req.params.email;
        const dataToBeUpdated = {};
        if(orgName){
            dataToBeUpdated.orgName = orgName;
        }
        if(firstName){
            dataToBeUpdated.firstName = firstName;
        }
        if(lastName){
            dataToBeUpdated.lastName = lastName;
        }
        if(email){
            dataToBeUpdated.email = email;
        }
        if(password){
            dataToBeUpdated.password = password;
        }
        if(country){
            dataToBeUpdated.country = country;
        }
        if(orgAddress){
            dataToBeUpdated.orgAddress = orgAddress;
        }

        try{
            const EmployerUpdated = await Employer.findOneAndUpdate({email: email_in}, dataToBeUpdated, {new: true, runValidators: true});
            console.log(EmployerUpdated);
            if(!EmployerUpdated){
                return res.status(404).json({message: 'The Employer was not found'});
            }
            const infoToken= {
                orgName: EmployerUpdated.orgName,
                firstName: EmployerUpdated.firstName,
                lastName: EmployerUpdated.lastName,
                email: EmployerUpdated.email,
                stageOfCompletion: 5,
                id : EmployerUpdated._id
            }
            jwt.sign(infoToken, SECRETKEY, {expiresIn: "1m"}, (error, token) => {
                if(error){
                    return res.status(400).json({message: 'Error generating token'});
                }
                return res.status(201).json({token});
            });
        }catch(error){
            return res.status(400).json(error);
        }

    },
    deleteOne :async (req,res) => {},
    login :async (req,res) => {
        const {email,password} = req.body;
        try{
            const currentUser = await Employer.findOne({email});
            if(!currentUser){
                return res.status(400).json({ errors: { email: {message: "We could not find the email address u entered"} } });
            }

            const validPassword = await bcrypt.compare(password, currentUser.password);
            if(!validPassword){
                return res.status(400).json({ errors: { password: {message: "The password u entered is incorrect"} } });
            }
            ///Jason token generation
            const infoToken = {
                orgName: currentUser.orgName,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
                stageOfCompletion: 5,
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

export default employersController;