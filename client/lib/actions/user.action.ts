"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import console from "console";

export async function getUserById(params: any) {
    try {
        connectToDatabase();

        const { userId } = params;
        console.log(params);
        const user = await User.findOne({ clerkId: userId });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createUser(userData: any) {
    try {
        connectToDatabase();

        const newUser = await User.create(userData);
        console.log(userData);
        return newUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateUser(params: any) {
    try {
        connectToDatabase();

        const { clerkId, updateData, path } = params;
        console.log(params);
        await User.findOneAndUpdate({ clerkId }, updateData, {
            new: true,
        });

        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteUser(params: any) {
    try {
        connectToDatabase();

        const { clerkId } = params;
        console.log(params);
        const user = (await User.findOneAndDelete({ clerkId })) as any;

        if (!user) {
            throw new Error("User not found");
        }

        const deletedUser = await User.findByIdAndDelete(user._id);

        return deletedUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

