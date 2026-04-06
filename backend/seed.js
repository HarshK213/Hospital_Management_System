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

const indianDoctors = [
  { fullname: "Dr. Rajesh Kumar", specialization: "Cardiologist", user_id: "DOC-RAJ-001", email: "rajesh.kumar@hospital.com", phone: "9876543201", about: "Senior Cardiologist with 15 years experience in treating heart conditions", doctorFields: ["Cardiology", "HeartSurgery", "Interventional"] },
  { fullname: "Dr. Priya Sharma", specialization: "Pediatrician", user_id: "DOC-PRI-002", email: "priya.sharma@hospital.com", phone: "9876543202", about: "Expert Pediatrician specializing in child healthcare", doctorFields: ["Pediatrics", "Neonatology", "Immunization"] },
  { fullname: "Dr. Amit Patel", specialization: "General Physician", user_id: "DOC-AMI-003", email: "amit.patel@hospital.com", phone: "9876543203", about: "General Physician for common ailments and preventive care", doctorFields: ["GeneralMedicine", "PreventiveCare", "Emergency"] },
  { fullname: "Dr. Sunita Devi", specialization: "Gynecologist", user_id: "DOC-SUN-004", email: "sunita.devi@hospital.com", phone: "9876543204", about: "Experienced Gynecologist for women's health", doctorFields: ["Gynecology", "Obstetrics", "Fertility"] },
  { fullname: "Dr. Vikram Singh", specialization: "Orthopedic", user_id: "DOC-VIK-005", email: "vikram.singh@hospital.com", phone: "9876543205", about: "Orthopedic surgeon specializing in bone and joint problems", doctorFields: ["Orthopedics", "JointReplacement", "SportsMedicine"] },
  { fullname: "Dr. Anjali Gupta", specialization: "Dermatologist", user_id: "DOC-ANJ-006", email: "anjali.gupta@hospital.com", phone: "9876543206", about: "Dermatologist for skin, hair, and nail conditions", doctorFields: ["Dermatology", "Cosmetic", "HairCare"] },
  { fullname: "Dr. Mohammad Khan", specialization: "Neurologist", user_id: "DOC-MOH-007", email: "mohammad.khan@hospital.com", phone: "9876543207", about: "Neurologist expert in brain and nervous system disorders", doctorFields: ["Neurology", "Neurosurgery", "Epilepsy"] },
  { fullname: "Dr. Lakshmi Narayanan", specialization: "Gastroenterologist", user_id: "DOC-LAK-008", email: "lakshmi.narayanan@hospital.com", phone: "9876543208", about: "Gastroenterologist for digestive system disorders", doctorFields: ["Gastroenterology", "Hepatology", "Endoscopy"] },
  { fullname: "Dr. Kavita Iyer", specialization: "Ophthalmologist", user_id: "DOC-KAV-009", email: "kavita.iyer@hospital.com", phone: "9876543209", about: "Ophthalmologist expert in eye care and surgeries", doctorFields: ["Ophthalmology", "Retina", "Cataract"] },
  { fullname: "Dr. Suresh Reddy", specialization: "Pulmonologist", user_id: "DOC-SUR-010", email: "suresh.reddy@hospital.com", phone: "9876543210", about: "Pulmonologist for respiratory and lung diseases", doctorFields: ["Pulmonology", "CriticalCare", "SleepMedicine"] },
];

const indianPatients = [
  { username: "patient_rahul", fullname: "Rahul Verma", email: "rahul.verma@email.com", phone: "9123456701" },
  { username: "patient_anita", fullname: "Anita Desai", email: "anita.desai@email.com", phone: "9123456702" },
  { username: "patient_rajesh", fullname: "Rajesh Khanna", email: "rajesh.khanna@email.com", phone: "9123456703" },
  { username: "patient_meera", fullname: "Meera Nair", email: "meera.nair@email.com", phone: "9123456704" },
  { username: "patient_akash", fullname: "Akash Sharma", email: "akash.sharma@email.com", phone: "9123456705" },
  { username: "patient_fatma", fullname: "Fatma Sheikh", email: "fatma.sheikh@email.com", phone: "9123456706" },
  { username: "patient_deepak", fullname: "Deepak Gupta", email: "deepak.gupta@email.com", phone: "9123456707" },
  { username: "patient_lavanya", fullname: "Lavanya Rajan", email: "lavanya.rajan@email.com", phone: "9123456708" },
  { username: "patient_vikram", fullname: "Vikram Malhotra", email: "vikram.malhotra@email.com", phone: "9123456709" },
  { username: "patient_priya", fullname: "Priya Menon", email: "priya.menon@email.com", phone: "9123456710" },
];

const commonDiseases = [
  { name: "Hypertension", prescription: "Amlodipine 5mg once daily, Aspirin 75mg once daily, Lifestyle modifications" },
  { name: "Type 2 Diabetes", prescription: "Metformin 500mg twice daily, Glipizide 5mg once daily, Diet control" },
  { name: "Acute Bronchitis", prescription: "Amoxicillin 500mg thrice daily for 5 days, Cough syrup 10ml thrice daily, Rest" },
  { name: "Viral Fever", prescription: "Paracetamol 650mg thrice daily, Vitamin C 500mg twice daily, Plenty of fluids" },
  { name: "Gastritis", prescription: "Omeprazole 20mg once daily before breakfast, Antacid syrup 10ml as needed" },
  { name: "Migraine", prescription: "Sumatriptan 50mg when needed, Naproxen 250mg twice daily during episodes" },
  { name: "Arthritis", prescription: "Ibuprofen 400mg thrice daily, Glucosamine supplement, Physiotherapy" },
  { name: "Dengue Fever", prescription: "Paracetamol 650mg as needed, ORS solution, Papaya leaf extract, Platelet monitoring" },
  { name: "Typhoid", prescription: "Azithromycin 500mg once daily for 5 days, Ofloxacin 200mg twice daily, Diet modification" },
  { name: "Pneumonia", prescription: "Azithromycin 500mg once daily, Cough expectorant, Breathing exercises" },
];

const wards = ["General Ward", "ICU", "Private Ward", "Pediatric Ward", "Emergency"];

async function seedData() {
  try {
    await DBConnect();
    console.log("Connected to database");

    await Staff.deleteMany({});
    await Patient.deleteMany({});
    await MedicalHistory.deleteMany({});
    await Appointment.deleteMany({});
    await Bed.deleteMany({});
    await Admission.deleteMany({});
    console.log("Cleared existing data");

    const hashedPassword = await bcrypt.hash("password123", 10);
    const doctors = [];
    const staffMembers = [];

    for (const doc of indianDoctors) {
      const staff = await Staff.create({
        fullname: doc.fullname,
        user_id: doc.user_id,
        email: doc.email,
        phone: doc.phone,
        about: doc.about,
        password: hashedPassword,
        role: "doctor",
        doctorFields: doc.doctorFields,
      });
      doctors.push(staff);
      console.log(`Created doctor: ${doc.fullname} - Fields: ${doc.doctorFields.join(", ")}`);
    }

    const nurses = ["Nurse Radhika", "Nurse Kavya", "Nurse Bhavana", "Nurse Swapna"];
    for (const nurse of nurses) {
      const staff = await Staff.create({
        fullname: nurse,
        user_id: `NUR-${Math.floor(1000 + Math.random() * 9000)}`,
        email: nurse.toLowerCase().replace(" ", ".") + "@hospital.com",
        phone: `9876543${Math.floor(100 + Math.random() * 900)}`,
        password: hashedPassword,
        role: "nurse",
        about: "Dedicated nursing staff",
      });
      staffMembers.push(staff);
    }

    const admin = await Staff.create({
      fullname: "Admin Singh",
      user_id: "ADMIN-001",
      email: "admin@hospital.com",
      phone: "9876543000",
      password: hashedPassword,
      role: "admin",
      about: "Hospital Administrator",
    });
    console.log("Created admin");

    const receptionist = await Staff.create({
      fullname: "Receptionist Anu",
      user_id: "RECEP-001",
      email: "reception@hospital.com",
      phone: "9876543001",
      password: hashedPassword,
      role: "receptionist",
      about: "Front desk coordinator",
    });
    console.log("Created receptionist");

    const patients = [];
    for (const p of indianPatients) {
      const patient = await Patient.create({
        ...p,
        password: hashedPassword,
        isVerified: true,
        emailVerifyToken: "verified_" + Math.random().toString(36).substring(7),
        emailVerificationTokenExpiry: null,
      });
      patients.push(patient);
      console.log(`Created patient: ${p.fullname}`);
    }

    const beds = [];
    for (let i = 1; i <= 10; i++) {
      const bed = await Bed.create({
        ward: wards[i % 5],
        bed_number: `B${i.toString().padStart(3, '0')}`,
        status: i <= 7 ? "occupied" : "available",
      });
      beds.push(bed);
    }
    console.log("Created 10 beds");

    for (const doctor of doctors) {
      for (let j = 0; j < 5; j++) {
        const appointmentDate = new Date();
        appointmentDate.setDate(appointmentDate.getDate() + Math.floor(Math.random() * 21) + 1);
        
        const availableTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
        
        await Appointment.create({
          patient_id: patients[Math.floor(Math.random() * patients.length)]._id,
          doctor_id: doctor._id,
          date: appointmentDate,
          time: availableTimes[Math.floor(Math.random() * availableTimes.length)],
          reason: commonDiseases[Math.floor(Math.random() * commonDiseases.length)].name,
          status: Math.random() > 0.3 ? "confirmed" : "pending",
        });
        console.log(`Created appointment for patient with ${doctor.fullname}`);
      }
    }

    // Create 10 more single appointments (original logic)
    for (let i = 0; i < 10; i++) {
      const appointmentDate = new Date();
      appointmentDate.setDate(appointmentDate.getDate() + Math.floor(Math.random() * 14));
      
      const availableTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
      
      await Appointment.create({
        patient_id: patients[i]._id,
        doctor_id: doctors[i]._id,
        date: appointmentDate,
        time: availableTimes[Math.floor(Math.random() * availableTimes.length)],
        reason: commonDiseases[i].name,
        status: i < 7 ? "confirmed" : "pending",
      });
      console.log(`Created appointment for ${patients[i].fullname} with ${doctors[i].fullname}`);
    }

    for (let i = 0; i < 10; i++) {
      const disease = commonDiseases[i];
      const admissionDate = new Date();
      admissionDate.setDate(admissionDate.getDate() - Math.floor(Math.random() * 30));

      const medicalRecord = [
        `Diagnosis: ${disease.name}`,
        `Prescription: ${disease.prescription}`,
        `Chief Complaint: Patient presented with symptoms of ${disease.name}`,
        `Treatment Plan: Medication + Follow-up in 2 weeks`,
      ];

      const labReport = [
        `CBC - Normal limits`,
        `Blood Sugar - ${Math.floor(100 + Math.random() * 100)} mg/dL`,
        `BP - ${Math.floor(110 + Math.random() * 30)}/${Math.floor(70 + Math.random() * 20)} mmHg`,
      ];

      const admissionHistory = [
        `Admitted on ${admissionDate.toDateString()}`,
        `Ward: ${wards[i % 5]}`,
        `Discharged: ${i < 8 ? "Yes" : "No"}`,
      ];

      await MedicalHistory.create({
        patient_id: patients[i]._id,
        medical_record: medicalRecord,
        lap_report: labReport,
        admission_history: admissionHistory,
      });
      console.log(`Created medical history for ${patients[i].fullname}`);
    }

    for (let i = 0; i < 7; i++) {
      const admissionDate = new Date();
      admissionDate.setDate(admissionDate.getDate() - Math.floor(Math.random() * 15));

      const dischargeDate = new Date(admissionDate);
      dischargeDate.setDate(dischargeDate.getDate() + Math.floor(3 + Math.random() * 7));

      await Admission.create({
        patient_id: patients[i]._id,
        bed_id: beds[i]._id,
        admission_date: admissionDate,
        discharge_date: i < 5 ? dischargeDate : null,
        status: i < 5 ? "discharged" : "admitted",
      });
      console.log(`Created admission record for ${patients[i].fullname}`);
    }

    console.log("\n✅ Seeding completed successfully!");
    console.log("\nLogin credentials:");
    console.log("  Doctors: user_id from list, password: password123");
    console.log("  Admin: admin@hospital.com, password: password123");
    console.log("  Patients: email from list, password: password123");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedData();
