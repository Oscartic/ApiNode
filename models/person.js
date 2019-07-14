import mongoose, { Schema } from 'mongoose'

const personSchema = new Schema({
    person_type: { type:String, maxlength:20, required:true },
    name: { type:String, maxlength:60, unique:true ,required:true },
    document_type: { type:String, maxlength:20 },
    document_num: { type:String, maxlength:20 },
    address: { type:String, maxlength:70 },
    phone: { type:String, maxlength:20 },
    email: { type:String, maxlength:50, unique:true },
    state: { type:Number, default:1 },
    createdAt: { type:Date, default: Date.now },
});

const Person = mongoose.model('person', personSchema);
export default Person;