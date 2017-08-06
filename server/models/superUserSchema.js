import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const SuperUserSchema = new Schema({
    _id: String
})


export default mongoose.model('superusers', SuperUserSchema);