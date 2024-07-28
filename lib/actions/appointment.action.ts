"use server";

import { ID } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  database,
  DATABASE_ID,
} from "../appwirte.config";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await database.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};
