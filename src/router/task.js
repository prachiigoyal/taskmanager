const express=require('express')
const Tasks = require('../models/tasks')
const app= new  express.Router()
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')

//==================================

//     task.save().then(()=>{
    //         res.send(task)
//     }).catch((error)=>{
//         res.status(400).send(error)
//     })
// })
app.get('/tasks',auth,async(request,response)=>{

    const match={}
const sort={}
if(request.query.completed){
    match.completed= request.query.completed==='true'
}
if(request.query.sortBy){
    const parts = request.query.sortBy.split(':')
    sort[parts[0]] =parts[1]==='desc'? -1:1
}
    // const tasks= await Tasks.find({owner:request.user._id})
    await request.user.populate({
        path:'tasks',
        match,
        options:{
            limit:parseInt(request.query.limit),
            skip:parseInt(request.query.skip),
            sort
        }


    }).execPopulate()
    try{
        response.send(request.user.tasks)
    }catch(error){
        response.status(400).send(error)
    }
    // Tasks.find().then((tasks)=>{
    //     res.send(tasks)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
})

app.get('/tasks/:id',auth,async(request,response)=>{
    const _id =request.params.id
    try{
    //    const task= await Tasks.findById(_id)
       const task= await Tasks.findOne({_id, owner:request.user._id})
        if(!task)
            {return response.status(404).send()}

        response.send(task)

        }catch(error)
        {response.status(500).send(error)}
//     Tasks.findById(_id).then((task)=>{
//         if(!task)
//         return res.status(404).send()

//         res.send(task)
//     }).catch((err)=>{
//         res.status(500).send()
//     })
})
app.patch('/tasks/:id',auth,async(request,response)=>{
    const updates = Object.keys(request.body)
    const allowedUpdates =['description','completed']
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidUpdate){
        res.status(400).send({error: 'Invalid Updates!'})
    }
    try{
       const task = await Tasks.findOne({_id:request.params.id , owner: request.user.id})
       //    const task = await Tasks.findById(request.params.id)
       
       // const task = await Tasks.findByIdAndUpdate(request.params.id,request.body,{ new:true , runValidators:true})
       
       if(!task){
           return response.status(404).send()} 
           updates.forEach((update)=> task[update]=request.body[update])
           await task.save()
           response.send(task)
           
        }catch(e){
            console.log(e)
            response.status(400).send(e)
        }
    })

    app.delete('/tasks/:id',auth, async(req,res)=>{
        try{
            const itemtodelete= await Tasks.findOneAndDelete({_id:req.params.id,owner:req.user.id})
            // const itemtodelete= await Tasks.findByIdAndDelete(req.params.id)
            if(!itemtodelete){
                res.status(404).send({error:'Task not found'})
            }
            res.send(itemtodelete)
        }catch(err){res.status(400).send(err)}

    })

    app.post('/tasks',auth, async(req,res)=>{
        // const task = new Tasks(req.body)
        const task= new Tasks({
            ...req.body,
            owner: req.user._id
        })
        try{
       await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

//====================================
module.exports= app