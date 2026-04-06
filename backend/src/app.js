import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import adminRoute from "./routes/admin.route.js";
import doctorRoute from "./routes/doctor.route.js";
import patientRoute from "./routes/patient.route.js";
import receptionistRoute from "./routes/receptionist.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();

app.use(
  cors({
    origin:"http://localhost:5173",
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

export default app;
