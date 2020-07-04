const mongoose = require('mongoose')
const validator= require('validator')

// const bcrypt = require('bcryptjs')

// const taskSchema =new mongoose.Schema()
// taskSchema.pre('save',async function (next) {
//     // // const task = this
//     // await task.password=
//     if(this.isModified('completed'))
//     {
//         this.completed=await bcrypt.hash(this.completed,8)

//     }
//     next()

// })

    


    const taskSchema =new mongoose.Schema({
    description:{
        type:String,
        require:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'

    }

},{
    timestamps:true
})
const Tasks = mongoose.model('Tasks',taskSchema)

module.exports = Tasks