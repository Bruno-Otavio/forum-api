import { Request, Response } from 'express';

import User from '../models/user.model.ts';
import IUser from '../ts/interfaces/user.interface.ts';

const getById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user: IUser | null = await User.findById(id).exec();
		res.status(200).json(user).end();
	} catch (err) {
		res.status(404).json({ message: `${err}` }).end();
	}
}

const update = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { username, email } = req.body;

		const user = User.findByIdAndUpdate(
			id, 
			{ username, email },
			{ 
				new: true, 
				runValidators: true,
			},
		);

		if (user) {
			res.status(200).json(user).end();
		}
		else {
			res.status(404).json({ message: 'Could not find user' }).end();
		}
	} catch (err) {
		res.status(400).json({ message: `${err}` }).end();
	}
}

const del = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const user = await User.findByIdAndDelete(id);

		if (user) {
			res.status(200).json({ message: 'User deleted successfully' }).end();
		} else {
			res.status(404).json({ message: 'Could not find user' }).end();
		}
	} catch (err) {
		res.status(400).json({ message: `${err}` }).end();
	}
}

export default {
	getById,
	update,
	del,
};
