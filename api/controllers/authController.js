import { promisify } from "util";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import userProf from '../Models/userProf'

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const signup = async (req, res, next) => {
	try {
		const newUser = await userProf.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});

		res.status(201).json({
			status: "success",
			token: signToken(newUser._id),
			user: {
				newUser,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err.message,
		});
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password)
			return next(new AppError(404, "please provide email and password"));

		const isUser = await userProf.findOne({ email }).select("+password");

		if (isUser) {
			if (await isUser.correctPassword(password, isUser.password)) {
				res.status(201).json({
					status: "success",
					token: signToken(isUser._id),
				});
			} else throw new Error(`Password is invalid`);
		} else throw new Error(`User account dosen't exist`);
	} catch (err) {
		next(new AppError(401, err.message));
	}
};

const protect = async (req, res, next) => {
	try {
		// 1) Getting token and check if its there
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		}
		if (!token) return next(new AppError(401, "you are not logged in"));

		// 2) Verify Token
		const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // returns payload data

		// 3)Check if user still exist
		const user = await userProf.findById(decoded.id);
		if (!user) return next(new AppError(401, "user does not exist"));

		// GRANTING ACCESS TO PROTECTED ROUTE
		req.user = user;
		next();
	} catch (err) {
		next(new AppError(400, "invalid token, please login again"));
	}
};


export {signup, login };

