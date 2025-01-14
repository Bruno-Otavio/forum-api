import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../models/user.model.ts';
import IUser from '../ts/interfaces/user.interface.ts';

dotenv.config();

const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user: IUser | null = await User.findOne({ email }).exec();

		if (!user) {
			throw Error('[auth] Email or password incorrect');
		}

		const match: boolean = await bcrypt.compare(password, user.password!);
		
		if (!match) {
			throw Error('[auth] Email or password incorrect');
		}

		delete user.password;
		const authToken = jwt.sign(
			{ data: user },
			process.env.JWT_KEY as string,
			{ expiresIn: '1d'},
		);

		if (!authToken) {
			throw Error('[token] Could not generate token');
		}

		res.status(200).json({ 
			authToken: authToken,
			message: 'Login successful' 
		}).end();
	} catch (err: any) {
		const type = err.message.split(' ')[0];

		let message = err.message.split('] ')[1];
		let statusCode = 500; // default status code

		switch (type) {
			case '[auth]':
				statusCode = 401;
				break;
			case '[token]':
				statusCode = 500;
				break;
		}

		res.status(statusCode).json({ message: message }).end();
	}
}

const register = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body
		const hashedPassword: string = await bcrypt.hash(password, 10);

		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		res.status(201).json(user).end();
	} catch (err) {
		res.status(400).json({ message: `${err}` }).end();
	}
}

export default { login, register };

