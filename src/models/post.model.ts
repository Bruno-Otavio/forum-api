import { Schema, model } from 'mongoose';
import IPost from '../ts/interfaces/post.interface.ts';

const postSchema: Schema = new Schema({
	_author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	imageUrl: String,
	metadata: {
		upVotes: { type: Number, default: 0 },
		downVotes: { type: Number, default: 0 },
		favorites: { type: Number, default: 0 },
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true,
	},
	lastUpdate: Date,
});

const Post = model<IPost>('Post', postSchema);

export default Post;

