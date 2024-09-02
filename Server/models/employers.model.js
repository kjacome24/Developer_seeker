import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

////this is a clue

const employerSchema = new mongoose.Schema(
    {
        orgName :{
            type : String,
            required : [true, 'Organization Name is required'],
            minlength : [3, 'Organization Name must be at least 3 characters long'],
            maxlength : [20, 'Organization Name must be at most 20 characters long'],
        },
        firstName :{
            type : String,
            required : [true, 'First Name is required'],
            minlength : [3, 'First Name must be at least 3 characters long'],
            maxlength : [20, 'First Name must be at most 20 characters long'],
        },
        lastName :{
            type : String,
            required : [true, 'Last Name is required'],
            minlength : [3, 'Last Name must be at least 3 characters long'],
            maxlength : [20, 'Last Name must be at most 20 characters long'],
        },
        email:{
            type : String,
            required : [true, 'Email is required'],
            unique : true,
        },
        password:{
            type : String,
            required : [true, 'Password is required'],
            minlength : [8, 'Password must be at least 8 characters long'],
            maxlength : [200, 'Password must be at most 20 characters long'],
            validate: {
                validator: function (value) {
                    const hasNumber = /\d/;
                    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/;
                    const hasUppercase = /[A-Z]/;
                    return hasNumber.test(value) && hasSymbol.test(value) && hasUppercase.test(value);
                },
                message: 'Password must contain at least one number, one symbol, and one uppercase letter'
            }
        },
        orgAddress:{
            type : String,
            required : [true, 'Organization Address is required'],
            minlength : [3, 'Organization Address must be at least 3 characters long'],
            maxlength : [50, 'Organization Address must be at most 50 characters long'],
        },
        country:{
            type : String,
            required : [true, 'Country is required'],
        },
        image: {
            type: String, // This will store the Base64 encoded image string
        },
    },{timestamps: true}
);

////validation of fields prior to creation, updating or modifying data
employerSchema.virtual('confirmPassword')
    .get(function(){
        return this._confirmPassword;
    })
    .set(
        function(value){
            this._confirmPassword = value;
        }
    );

employerSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords do not match');
    }
    next();
});


////hashing the password before saving it to the database
employerSchema.pre('save', function(next){
    bcrypt.hash(this.password,10)
    .then((encriptedPassword) => {
        this.password = encriptedPassword;
        next();
    });
});

const Employer = mongoose.model('employers', employerSchema);

export {Employer, employerSchema};