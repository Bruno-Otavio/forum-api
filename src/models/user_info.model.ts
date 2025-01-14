import { Schema, model } from 'mongoose';

const infoSchema = new Schema({
	nickname: String,
	imageUrl: String,
	postsAmount: Number,
	commentsAmount: Number,
});

const Info = model('UserInfo', infoSchema);

export default Info;

