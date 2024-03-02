import { Webhook } from "svix";
import { headers } from "next/headers";
import {
  createUser,
  updateUser,
  deleteUser,
} from "../../../lib/actions/user.action";
import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type

  try {
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
        username,
      } = evt.data;

      const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
        username: username,
        firstName: first_name,
        lastName: last_name,
        picture: image_url,
      };

      const headers = {
        "X-API-KEY":
          "neurelo_9wKFBp874Z5xFw6ZCfvhXRS3+a98kbcH+aaPggVruwPmdYmDQKxejf4E5/0SofGGhr4YNSI39y74J+TDb6bfU6ycLxFnZfrT63gd2YV6erT6I4swAbOf24NfxI4gHdFxKlPILjwEQ9B3IGmWTz4+ZHsbvqZ7ZiORIE7NfQ74RnpHrscTU/mt18259EbtqYx+_gKbHG+ve51/+29Ai6WtyYLiafHyTpCnYKZ3PDqpLSQE=",
        "Content-Type": "application/json",
      };

      try {
        // Directly pass the user object without JSON.stringify
        const response = await axios.post(
          "https://us-east-2.aws.neurelo.com/rest/users/__one",
          JSON.stringify(user),
          { headers: headers }
        );
        return NextResponse.json({ message: "OK", user: JSON.stringify(user) }); // Here it's okay to stringify user for the response
      } catch (error) {
        console.error("error", error);
      }
    }

    if (eventType === "user.updated") {
      const {
        id,
        email_addresses,
        image_url,
        username,
        first_name,
        last_name,
      } = evt.data;

      // Create a new user in your database
      const mongoUser = await updateUser({
        clerkId: id,
        updateData: {
          name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
          username: username,
          email: email_addresses[0].email_address,
          picture: image_url,
        },
        path: `/profile/${id}`,
      });

      return NextResponse.json({ message: "OK", user: mongoUser });
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;

      const deletedUser = await deleteUser(id);

      return NextResponse.json({ message: "OK", user: deletedUser });
    }
  } catch (error) {
    console.log(error);
    return new Response(error, { status: 500 });
  }

  return new Response("", { status: 200 });
}
