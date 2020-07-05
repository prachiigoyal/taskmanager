// const jwt = require('jsonwebtoken')
const jwt= require('jwt-simple')
const User=require('../models/user')

const auth= async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
   const decoded = jwt.decode(token,process.env.JWT_TOKEN)
   const user = await User.findOne({_id:decoded._id,'token.token': token})
   if(!user){
       throw new Error()
   }
   req.token=token
  req.user=user
  next()
    }catch(e){
        res.status(401).send({e:'please authenticate.'})
    }
}
module.exports = auth