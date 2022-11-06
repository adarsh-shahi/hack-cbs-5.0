import {mongoose , Schema} from 'mongoose';  // this can be accessed only by the patient

const user = new Schema({
   name:{
      type:String,
      required:true,
   },
   email:{
      type:String,
      required:true,
      unique:true
   },
   password:{
      type:String,
      required:true
   },
   birthDate:{
      type:Date,
      required:false
   },
   gender:{
      type:String,
      required:false
   },
   bloodGroup:{
      type:String,
      required:false
   },
   height:[{
      value:{
         type:Number,
         required:false
      },
      unit:{
         type:String,
         required:false,
         default:'cm'
      }
   }],
   weight:[{
      value:{
         type:Number,
         required:false
      },
      unit:{
         type:String,
         required:false,
         default:'cm'
      }
   }]
})

module.exports = mongoose.model('users', user);