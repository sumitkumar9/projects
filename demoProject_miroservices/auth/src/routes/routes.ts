import express, { Request, Response } from 'express';
const router = express.Router();
import {Customer} from '../model/customer';

router.post('/signup', async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const userExist = await Customer.findOne({ email: email });
    if (userExist) {
        return res.send('user already exist');
    }
    const user = await new Customer({
        email,
        firstName,
        lastName,
        password
    })
    const createdUser = await user.save();
    // if (createdUser) {
    //     await axios.post("http://localhost:4006/events", {
    //         type: "UserCreated",
    //         data: {
    //             customerId: createdUser._id,
    //         },
    //     });
    // }
    return res.status(200).send(createdUser);
});

router.post('/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userExist = await Customer.findOne({ email: email, password: password });
    if (userExist) {
        return res.status(200).send('you are in!');
    }
    else {
        return res.send('please provide valid email or password');
    }
});

export {router};