import { Schema, model } from 'mongoose';
import IUser from '../ts/interfaces/user.interface.ts';

const userSchema: Schema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true,
	},
	lastUpdate: Date,
});

const User = model<IUser>('User', userSchema);

export default User;

