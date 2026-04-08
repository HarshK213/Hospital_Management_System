import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Staff } from "./src/models/staff.model.js";
import { Patient } from "./src/models/patient.model.js";
import { MedicalHistory } from "./src/models/medical_history.model.js";
import { Appointment } from "./src/models/appointment.model.js";
import { Bed } from "./src/models/bed.model.js";
import { Admission } from "./src/models/admission.model.js";
import DBConnect from "./src/db/db.js";

dotenv.config();

async function seedData() {
  try {
    await DBConnect();
    console.log("Connected to database");

    const hashedPassword = await bcrypt.hash("password123", 10);
   
    const admin = await Staff.create({
      fullname: "Akio",
      user_id: "ADMIN-001",
      email: "akioatom@gmail.com",
      phone: "1111111111",
      password: hashedPassword,
      role: "admin",
      about: "Hospital Administrator",
    });
    console.log("Created admin");

    await mongoose.connection.close();
    process.exit(0);

  }
  catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

// seedData();

async function fetchPatient() {
  try {
    await DBConnect();
    console.log("Connected to database");

    const patient = await Patient.find();
    console.log(patient);

    await mongoose.connection.close();
    process.exit(0);

  }
  catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

fetchPatient();