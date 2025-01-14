import { Document } from 'mongoose';

interface IUser extends Document {
	username: string;
	email: string;
	password?: string;
	createdAt: Date;
	lastUpdate?: Date;
}

export default IUser;
