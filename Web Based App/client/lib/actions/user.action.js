"use server";
import { connectToDatabase } from "../database";
import User from "../../database/user.model";
import { revalidatePath } from "next/cache";

export const createUser = async (user) => {
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
  
    const user = await User.findOne({ clerkId });
    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}
