"use server";
import { connectToDatabase } from "../database";
import User from "../../database/user.model";
import { revalidatePath } from "next/cache";

export const createUser = async (user) => {
  console.log("Printing from create user", user);
  try {
    await connectToDatabase();
    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log("Error creating user", error);
  }
};

export async function updateUser(params) {
  try {
    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log("Error deleting user", error);
  }
}

export async function deleteUser(clerkId) {
  try {
    await connectToDatabase();

    const deletedUser = await User.findOneAndDelete({ clerkId });

    if (!deletedUser) throw new Error("User deletion failed");
    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    console.log("Error deleting user", error);
  }
}

export async function getUserById(clerkId) {
  try {
    connectToDatabase();
    console.log("Printing from clerkid", clerkId);
    const user = await User.findOne({ clerkId });
    console.log("Printing from user", user);
    if (!user) throw new Error("User not found");
    console.log("Action", user);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}
