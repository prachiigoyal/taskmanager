const express = require('express') 
require('./db/mongoose')
const multer= require('multer')
// const User = require('./models/user')
const jwt = require('jsonwebtoken')

// const Tasks = require('./models/tasks')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
// const bcrypt = require('bcryptjs')

const { response } = require('express')
//isme upar dekho .db/mongoos se humne mongoose file ko import kia
// or user file ko bhi import kiya right?hnji
const app = express()
const PORT = process.env.PORT 
//======================================================
// app.use((req,res,next)=>{
// if(req.method === 'GET'){
//     res.send('GET requests are disabled')
// }else{
//     next()
// }
// })

// app.use((req,res)=>{
//     res.status(503).send('The site is under maintenance,Please Try after sometime!')
// })
//============================================================

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
//==========================================
const router = new express.Router()
router.get('/test',(req,res)=>{
    const token = jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'1 week'})

    console.log(token)
    const data= jwt.verify(token,'thisismynewcourse')
    console.log(data)
    res.send(token)
})
app.use(router)
//==========================================

// const myFunction=async (req,res) => {

//     const token = jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'1 week'})

//     console.log(token)
//     const data= jwt.verify(token,'thisismynewcourse')
//     console.log(data)
// }
// myFunction()
//===========================

//     // const password = 'Red12345!'
//     // const hashedPassword = await bcrypt.hash(password,8)
//     // console.log(password)
//     // console.log(hashedPassword)

//     //     const ismatch = await bcrypt.compare('Red12345!',hashedPassword)
//     //     console.log(ismatch)

// }
// myFunction()

const Tasks = require('./models/tasks')
const User = require('./models/user')



const upload= multer({
    dest:'image'
})
app.post('/upload', upload.single('upload'),(req,res)=>{
    res.send()
})
//=====================================================
// const main = async()=>{
//     // const task=await Tasks.findById('5ef8dcf34deaf317cccf44c1')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
    
//     const user = await User.findById('5efa2ee4bc46743044281740')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()
//==========================================================
app.listen(PORT,()=>{
    console.log("SERVER is up on port "+ PORT)
}) 



