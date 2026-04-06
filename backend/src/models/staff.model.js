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
      enum: ['admin','doctor','nurse','receptionist'],
      required: true,
    },
    doctorFields: {
      type: [String],
      validate: {
        validator: function(v) {
          return v.every(field => /^\S+$/.test(field));
        },
        message: 'Each doctor field must be a single word (no spaces)'
      },
      default: undefined
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

staffSchema.pre("save", async function(){
     if(this.isModified("password")){
          this.password = await bcrypt.hash(this.password, 10);
     }
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
                userName : this.user_id,
                fullName : this.fullname
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
