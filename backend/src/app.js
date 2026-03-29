import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import adminRoute from "./routes/admin.route.js";
import doctorRoute from "./routes/doctor.route.js";
import patientRoute from "./routes/patient.route.js";
import receptionistRoute from "./routes/receptionist.route.js";
import nurseRoute from "./routes/nurse.route.js";
import pharmacistRoute from "./routes/pharmicist.route.js";
import labTechnicianRoute from "./routes/lab_technicia.route.js";
import inPatientManagerRoute from "./routes/in-patient_manager.route.js";
import storeManagerRoute from "./routes/store_manager.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true, limit: "15kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/doctor", doctorRoute);
app.use("/api/v1/patient", patientRoute);
app.use("/api/v1/receptionist", receptionistRoute);
app.use("/api/v1/nurse", nurseRoute);
app.use("/api/v1/pharmacist", pharmacistRoute);
app.use("/api/v1/lab-technician", labTechnicianRoute);
app.use("/api/v1/in-patient-manager", inPatientManagerRoute);
app.use("/api/v1/store-manager", storeManagerRoute);

export default app;
