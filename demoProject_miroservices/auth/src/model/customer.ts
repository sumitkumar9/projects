import mongoose, { model } from 'mongoose';

interface Icustomer{
    email: string,
    firstName: string,
    lastName: string,
    password: string
}

const customerSchema = new mongoose.Schema<Icustomer>({
    email: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String}
})

const Customer = model<Icustomer>('Customer', customerSchema);

export {Customer};