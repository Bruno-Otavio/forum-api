import mongoose, { ObjectId } from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import User from '../models/user.model.ts';
import Post from '../models/post.model.ts';
import Comment from '../models/comment.model.ts';

import usersData from './users.json';
import postsData from './posts.json';
import commentsData from './comments.json';

dotenv.config();

async function main() {
	// Insert Users
	for (const u of usersData) {
		const hashedPassword = await bcrypt.hash(u.password, 10);
		try {
			await User.create({
				username: u.username,
				email: u.email,
				password: hashedPassword,
			});
			console.log(`User ${u.username} created successfully.`);
		} catch (err) {
			console.log(`User already created.`);
		}
	}

	// Insert Posts
	try {
		await Post.create(postsData);
		console.log('Posts created successfully.');
	} catch (err) {
		console.log('Error while creating posts.');
		console.error(err);
	}

	// Insert Comments
	try {
		await Comment.create(commentsData);
		console.log('Comments created successfully');
	} catch (err) {
		console.log('Error while creating comments.');
		console.error(err);
	}
};

mongoose.connect(process.env.DATABASE_URL as string)
	.then(() => {
		main()
			.then(() => {
				console.log('Seed finished');
			})
			.catch((err) => {
				console.error(err);
			});
	})
	.catch((err) => console.error(err));

