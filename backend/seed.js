import mongoose from "mongoose";
import dotenv from "dotenv";
import { Staff } from "./src/models/staff.model.js";
import DBConnect from "./src/db/db.js";

// Load environment variables
dotenv.config();

const roles = [
  'admin',
  'doctor',
  'receptionist',
];

const seedStaff = async () => {
  try {
    // Connect to the database
    await DBConnect();

    console.log("Starting to seed staff data...");

    const staffData = roles.map((role, index) => {
      // Create a normalized prefix for emails and ids (e.g., 'lab technician' -> 'lab_technician')
      const prefix = role.replace(/ /g, "_");
      
      // Capitalize first letter of role for the display name
      const roleNameCapitalized = role.charAt(0).toUpperCase() + role.slice(1);

      return {
        fullname: `Test ${roleNameCapitalized}`,
        user_id: `${prefix}123`,
        email: `${prefix}@hospital.com`,
        phone: `123456789${index}`, // just a dummy unique phone number
        password: `password123`, // This will be automatically hashed by the pre-save hook in the schema
        about: `I am a dedicated ${role} working at this hospital.`,
        role: role,
      };
    });

    // We use .create() in a loop instead of .insertMany() because we want to trigger the Mongoose pre-save hook to hash the passwords.
    for (const data of staffData) {
      const existingUser = await Staff.findOne({ user_id: data.user_id });
      if (!existingUser) {
        await Staff.create(data);
        console.log(`✅ successfully created staff member with role: ${data.role} (${data.user_id})`);
      } else {
        console.log(`ℹ️ Staff member with role ${data.role} (${data.user_id}) already exists, skipping.`);
      }
    }

    console.log("\nSeeding completed successfully!");
    console.log("To log in, use the 'user_id' e.g. 'doctor123' and password 'password123'");
    
    // Disconnect properly
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedStaff();
