import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    _id: String,
    name: {type: String},
    age: {type: Number, default: 0},
    password: String,
    isAdmin: {type: Boolean, default: false},
    isActive: {type: Boolean, default: true},
    avatar: {type: String, default: ''}
    }, {
    collection : 'users'
})


export default mongoose.model('users', UserSchema);