const express= require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { response } = require('express')
const router= new express.Router()
const multer= require('multer')
const sharp= require('sharp')
const { sendWelcomeEmail } = require('../emails/accounts')
const { sendGoodbyeEmail } = require('../emails/accounts')


router.post('/users',async(req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        sendWelcomeEmail(user.email,user.name)
       const token = await user.generateAuthToken()
       
        res.status(201).send({user,token})
    }catch(error){
        res.status(400).send(error)
    }
//     // console.log(req.body)
//     // res.send('testing')
//     const user = new User(req.body)
// //yaha par humne new user create kiaaaa jisme  req.body hai hnji
//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((error)=>{
//         res.status(500).send()
//     })okok
})
router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
        
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})
 
router.get('/users/me',auth,async(req,res)=>{
    res.send(req.user)
//=====================================
    // const users = await User.find({})
    // try{
    //     res.send(users)
    // }catch(e){
    //     res.status(400).send(e)
    // }
//======================================
    // User.find({}).then((user)=>{
    //     res.send(user)
    // }).catch((err)=>{res.status(400).send(err)})
})

router.get('/users/:id',async(req,res)=>{
    const _id = req.params.id 

   
    try{
        const users = await User.findById(_id)
    if(!users)
    {
        return res.status(404).send()
    }
    
    res.send(users)
}catch(e){
    res.status(500).send(e)
}
// User.findById(_id).then((user)=>{
    //     if(!user)
    //     return res.status(404).send()
    
    //     res.send(user)
    // }).catch((error)=>{
        //     res.status(500).send()
        // })
    })
    
    router.patch('/users/me',auth,async(request,response)=>{
        const updates=Object.keys(request.body) 
        const allowedUpdates=['name','age','password','email']
        const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update))
        if(!isValidUpdate){
            response.status(400).send({error:'Invalid Update!'})
        }
        try{
        //    const user = await User.findById(request.params.id)
           updates.forEach((update)=> request.user[update]=request.body[update])
           await request.user.save()
        





            // const user= await User.findByIdAndUpdate(request.params.id,request.body,{new:true , runValidators:true})
            // if (!user){
            //     response.status(404).send()
            // }
            response.send(request.user)
        }catch(error)
        {response.status(400).send(error)}
    })
    
router.delete('/users/me',auth,async(req,res)=>{
    try{
        // const user =await User.findByIdAndDelete(req.params.id)
        // if(!user){
        //     res.status(404).send()
        // }
        await req.user.remove()
        sendGoodbyeEmail(req.user.email,req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async(req,res)=>{
    try{
        req.user.token=req.user.token.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})



router.post('/users/logoutall', auth , async(req,res)=>{
try{
    req.user.token=[]
    await req.user.save()
   res.send()
    }
catch(e){
res.status(500).send(e)
}
})


const upload= multer({
 
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb)
    {   
        // if(!file.originalname.endsWith('.pdf'))
        // {
        //  return  cb(new Error('Enter PDF file only'))
        // }
        // cb(undefined,true)



        if(!file.originalname.match(/\.(jpeg|jpg|png|PNG)$/))
        {
         return  cb(new Error('Enter image only'))
        }
        cb(undefined,true)
    }
})
//=============
// router.post('/users/me/avatar',auth, upload.single('avatar'), async(req,res)=>{
//     const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
//     req.user.avatar= buffer
//     await req.user.save()
//     res.send()
// },(error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// })
//==================
// router.post('/users/me/avatar',auth, upload.single('avatar'), async(req,res)=>{
//     try{
//     const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
//     req.user.avatar= buffer
//     await req.user.save()
//     res.send()
//         }catch(error){
//             res.send(error)
//         }})
//===============
router.post('/users/me/avatar',auth, upload.single('avatar'), async(req,res)=>{
    req.user.avatar=req.file.buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
//==============

router.delete('/users/me/avatar',auth, upload.single('avatar'), async(req,res)=>{
    // req.user.avatar= req.file['avatar']
    req.user.avatar=undefined
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
 
router.get('/users/:id/avatar',async(req,res)=>{
    try{
    const user = await User.findById(req.params.id)
    if(!user||!user.avatar){
        throw new Error()
    }
    res.set('Content-Type','image/png')
    res.send(user.avatar)
}
catch(e){
    res.status(404).send()
    }})

module.exports = router