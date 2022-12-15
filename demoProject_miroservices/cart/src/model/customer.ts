import mongoose, { model } from 'mongoose';

interface Icustomer {
    customerId: string;
    customerName: string;
  }

const customerModel = new mongoose.Schema<Icustomer>({
    customerId: {type: String, required: true},
    customerName: {type: String}
})

const CustomerModel = model<Icustomer>('Customer', customerModel);

export { CustomerModel };