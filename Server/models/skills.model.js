import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Skill name is required'],
        unique: true, // Ensure each skill name is unique
    },
    image: {
        type: String, // This will store the Base64 encoded image string
        required: [true, 'Skill image is required'],
    },
    languageOrFramework: {
        type: String,
        required: [true, 'Skill type is required'],
    },
},{timestamps: true});

const Skill = mongoose.model('skills', skillSchema);

export {Skill, skillSchema};
