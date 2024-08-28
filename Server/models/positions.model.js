import mongoose from 'mongoose';
import { skillSchema } from './skills.model.js';
import { employerSchema } from './employers.model.js';

const positionSchema = new mongoose.Schema(
    {
        namePosition: {
            type: String,
            required: [true, 'Position Name is required'],
            minlength: [3, 'Position Name must be at least 3 characters long'],
            maxlength: [50, 'Position Name must be at most 20 characters long'],
        },
        jobDescription: {
            type: String,
            required: [true, 'Job Description is required'],
            minlength: [3, 'Job Description must be at least 3 characters long'],
            maxlength: [200, 'Job Description must be at most 200 characters long'],
        },
        company: employerSchema,
        languages: [skillSchema]
    },
    { timestamps: true }
);

const Position = mongoose.model('positions', positionSchema);

export default Position;
