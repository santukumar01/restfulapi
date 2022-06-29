const express = require('express');
require('./db/conn');
const Student = require ('./moduls/students');
const app= express();

const port = process.env.PORT || 8000;
//root end point
app.use(express.json());   // why-> inbuilt middle ware function 
app.post('/students', (req,res )=>{
    console.log(req.body);    //this is the reason
    const user =new Student(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
       
    }).catch((e)=>{
        res.status(400).send (e);
    })
})

//reading the data

// app.get('/students', (req, res)=>{
//     const studentsData = Student.find();
//     studentsData.then(()=>{
//         res.status(200).send(studentsData);
//     }).catch((e)=>{
//         console.log(e);
//         res.status(400).send(e);
//     })
// })

app.get('/students', async(req, res)=>{
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    }
    catch(e){
        res.send(e);
    }
});



app.get('/students/:id', async(req, res)=>{
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
    }
    catch(e){
        res.status(500).send(e);
    }
})

//updating data by its id;
//can change many field
app.patch('/students/:id',async(req, res)=>{
    try{
        const id = req.params.id ;
        const updateStudent = await Student.findByIdAndUpdate(id, req.body,{
            new : true
        });
        res.send(updateStudent);
    }catch(e){
        res.status(404).send(e);
    }
})

//how to delte record
app.delete('/students/:id', async(req, res)=>{
    try{
        const deleteStudent =await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).secd();
        }
        res.send(deleteStudent);
    }catch(e){
        res.status(500).send(e);
    }

})

app.listen(port, ()=>{
    console.log(`this api is running on pont-no :${port}`);
})
