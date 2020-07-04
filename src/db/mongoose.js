const mongoose = require('mongoose')
// const validator= require('validator')
//is wali file me humne User banaya naaa database me 


//ab idhar kya kiya?? comments ko ignore kro toh!>>?ptaani beb connect kia shyd
// hanji is file me jo abhi filhal hai uske according sirf connect he kiya na hmmh
mongoose.connect(process.env.MONGODB_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex : true
})

// const User = mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim: true
// },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value)
//         {
//             if(!validator.isEmail(value)){
//                 throw new Error('Provide a valid email')
//             }
//         }
//     },
//     age: {
//         type:Number,
//         default:0,
//         validate(value){
//             if(value<0){
//                 throw new Error('Age must be a positive number')

//             }
//         }
// }
// })

// const me = new User({
//     name: '         mokshi',
//     email: '           sikriMOHIT454@gmail.com'
// })
    


// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error',error)
// })

// const Tasks = mongoose.model('Tasks',{
//     description:{
//         type:String
//     },
//     completed:{
//         type:Boolean
//     }

// })

// const task = new Tasks({
//     description: 'plant a tree',
//     completed: false
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log(error)
// })


