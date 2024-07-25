"use server";

import { ID, Query } from "node-appwrite";
import { users } from "../appwirte.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log({newUser})
    return parseStringify(newUser)
  } catch (e: any) {
    if (e && e?.code === 409) {
      const document = await users.list([Query.equal("email", [user.email])]);
      return document?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try{
    const user = await users.get(userId)

    return parseStringify(user)
  }catch(e){
    console.log(e)
  }
}