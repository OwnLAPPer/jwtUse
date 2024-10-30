import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
});
userSchema.set('toJSON',{
    //virtuals:true,
    versionKey:false,
    transform:function(doc, ret, options) {
        delete ret._id;
        delete ret._password;
    },
})

export const UserModel = mongoose.model('User',userSchema);