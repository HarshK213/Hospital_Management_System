import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const staffSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    user_id:{
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
    },
    phone:{
      type: String,
      required: true,
    },
    password:{
      type: String,
      required: true,
    },
    about:{
      type: String,
      required: true,
    },
    role:{
      type: String,
      enum: ['admin','doctor','nurse','lab technician','pharmacist','receptionist','inventory manager','in-patient manager'],
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

staffSchema.pre("save", async function(next){
     if(this.isModified("password")){
          this.password = await bcrypt.hash(this.password, 10);
     }
     next();
})

staffSchema.methods.isPasswordCorrect = async function (password) {
     return await bcrypt.compare(password, this.password)     
}

staffSchema.methods.generateAccessToken = function(){
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

staffSchema.methods.generateRefreshToken = function(){
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

export const Staff = mongoose.model("Staff", staffSchema);
