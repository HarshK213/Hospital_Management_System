require('./node_modules/esbuild-register/dist/node.js').register();
require('dotenv').config();

import { Appointment } from './src/models/appointment.model.js';

const mongoose = require('mongoose');

const doctors = [
  "69d5e0acc850d826f3f2ff54",
  "69d5e294c850d826f3f2ff60",
  "69d5e2e2c850d826f3f2ff66",
  "69d5e6dec850d826f3f2ff78",
  "69d5e719c850d826f3f2ff7e"
];

const patients = [
  "69d5e719c850d826f3f2ff7e",
  "69d609c88247836bda416516",
  "69d60d9989a2a0d2626503a0",
  "69d60e3189a2a0d2626503ba",
  "69d60e7489a2a0d2626503cc"
];

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 7);
  
  let appointmentCount = 0;
  const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
  const reasons = ["General Checkup", "Follow-up", "Consultation", "Annual Physical", "Health Issue"];
  
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + Math.floor(appointmentCount / 5));
      
      const appointment = new Appointment({
        patient_id: new mongoose.Types.ObjectId(patients[j]),
        doctor_id: new mongoose.Types.ObjectId(doctors[i]),
        date: date,
        time: times[appointmentCount % times.length],
        reason: reasons[appointmentCount % reasons.length],
        status: "confirmed"
      });
      
      await appointment.save();
      console.log(`Created appointment ${appointmentCount + 1}: Patient ${patients[j]} -> Doctor ${doctors[i]} on ${date.toISOString().split('T')[0]}`);
      appointmentCount++;
    }
  }
  
  console.log(`\nTotal appointments created: ${appointmentCount}`);
  await mongoose.disconnect();
}

main().catch(console.error);
