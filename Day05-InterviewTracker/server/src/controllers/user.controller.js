import User from "../models/user.model.js";
import {AsyncHandler} from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
};

export const register = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
        throw new ApiError(400, "All fields are required");
    }

    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
        $or: [
            { username: normalizedUsername },
            { email: normalizedEmail },
        ],
    });

    if (existingUser) {
        throw new ApiError(409, "Username or email already exists");
    }

    const user = await User.create({
        username: normalizedUsername,
        email: normalizedEmail,
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res.status(201).json(
        new ApiResponse(201, { user: createdUser }, "User registered successfully")
    );
});

export const login = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required");
    }

    if (!password?.trim()) {
        throw new ApiError(400, "Password is required");
    }

    const query = username
        ? { username: username.trim().toLowerCase() }
        : { email: email.trim().toLowerCase() };

    const user = await User.findOne(query);

    if (!user) {
        throw new ApiError(401, "Invalid username/email or password");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid username/email or password");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            ...cookieOptions,
            maxAge: 24 * 60 * 60 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );
});

export const logout = AsyncHandler(async (req, res) => {
    const userId = req.user?._id || req.user?.id;

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, null, "User logged out successfully"));
});

export const getCurrentUser = AsyncHandler(async (req, res) => {
    console.log("request came from user ")
    const user = await User.findById(req.user._id).select(
        "-password -refreshToken"
    );

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Current user fetched successfully"));
});

export const refreshAccessToken = AsyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token required");
    }

    let decoded;
    try {
        decoded = jwt.verify(
            incomingRefreshToken,
            process.env.JWT_REFRESH_SECRET
        );
    } catch {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    const user = await User.findById(decoded.id);

    if (!user) {
        throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(401, "Refresh token expired or used");
    }

    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    return res
        .cookie("accessToken", accessToken, {
            ...cookieOptions,
            maxAge: 24 * 60 * 60 * 1000,
        })
        .cookie("refreshToken", newRefreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken: newRefreshToken,
                },
                "Access token refreshed successfully"
            )
        );
});

export const changePassword = AsyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword?.trim() || !newPassword?.trim()) {
        throw new ApiError(400, "Old password and new password are required");
    }

    if (oldPassword === newPassword) {
        throw new ApiError(400, "New password must be different from old password");
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Old password is incorrect");
    }

    user.password = newPassword;
    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Password changed successfully"));
}); 