import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const patientSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailVerifyToken: {
      type: String,
      required: true,
    },
    emailVerificationTokenExpiry: {
      type: Date,
      index: { expires: 0 },
    },
    providers: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    providerIds: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.pre("save", async function(next){
     if(this.isModified("password")){
          this.password = await bcrypt.hash(this.password, 10);
     }
     next();
})

patientSchema.methods.isPasswordCorrect = async function (password) {
     return await bcrypt.compare(password, this.password)     
}

patientSchema.methods.generateAccessToken = function(){
     // console.log("Inside Access token")
     return jwt.sign(
          {
               _id : this._id,
               email : this.email,
               userName : this.userName,
               fullName : this.fullName
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
               expiresIn : process.env.ACCESS_TOKEN_EXPIRY
          }
     )
}

patientSchema.methods.generateRefreshToken = function(){
     // console.log("Inside refresh token")
     return jwt.sign(
          {
               id : this.id,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
               expiresIn : process.env.REFRESH_TOKEN_EXPIRY
          }
     )
}

export const Patient = mongoose.model("Patient", patientSchema);
