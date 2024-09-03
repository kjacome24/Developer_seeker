import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    
    message: {
        type: String,
        required: true,
        minlength: [1, 'Message must be at least 1 character long'],
        maxlength: [2000, 'Message must be at most 2000 characters long']
    },

    timetamps: {
        type: Date,
        default: Date.now
    }

}, {timestamps: true}

);

const message = mongoose.model('messages', messageSchema);

export default message;