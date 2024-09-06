// import express from 'express';
// import cors from 'cors';

const express = require("express");

const app=express();

// connect();
const cors = require('cors');

// Fixing cors issue:
app.use(cors());

// // const cors = require("cors");
// // // npm i cors --save
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }
// app.use(cors(corsOptions)) // Use this after the variable declaration



// // Add Access Control Allow Origin headers
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http//localhost:3000");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });
  
// app.use(cors());

app.use(express.json());  // for json, else req.body will be undefined.
app.use(express.urlencoded({ extended: true})); // for form url-encoded working.


// // create a new teacher      /teacher
// app.post('/teacher',async(req,res)=>{
//     const data = req.body;
//     console.log('DATA IS '+ data.name);
//     console.log('DATA IS '+ data);
//     console.log(typeof(data));
//     // creating a model instance:

//     const teacher11 = new teacher(data);

//     // db. collection('teacher'). insertOne(req.body, (err, data) => {
//     //         if(err) return console. log(err);
//     //         res. send("Saved to database" + data);
//     // })

//     try{
//         await teacher11.save();
//         console.log("DATA SAVED : ");
//         console.log(teacher11);
//         return res.status(201).json(teacher11);
//     }
//     catch(error){
//         console.log("ERROR !!! ");
//         console.log(error.message);
//         return res.status(400).json(error.message);
//     }
// })

//  IMPORTING FS AND PATH MODULE:
const fs = require('fs');
const path = require('path');

// Create a new teacher      /teacher
app.post('/teacher', async (req, res) => {
    const data = req.body;

    console.log('DATA IS ' + data.name);
    console.log('DATA IS ' + JSON.stringify(data, null, 2));
    console.log(typeof(data));  // Should be 'object'

    // Path to the JSON file where teachers will be stored
    const filePath = path.join(__dirname, 'teachers.json');

    // Read the existing teachers from the file
    let teachers = [];
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        teachers = JSON.parse(fileData);
    }

    // Create a new teacher object (model instance)
    const newTeacher = data; // Here data is already an object, so no need to create a new instance like in MongoDB

    // Add the new teacher to the array
    teachers.push(newTeacher);

    // Save the updated teachers array back to the JSON file
    try {
        fs.writeFileSync(filePath, JSON.stringify(teachers, null, 2), 'utf8');
        console.log("DATA SAVED: ");
        console.log(newTeacher);
        return res.status(201).json(newTeacher);
    } catch (error) {
        console.log("ERROR!!!");
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
});


// // Get list of all teachers :    /
// app.get("/",async(req,res)=>{
//     const data = await teacher.find(); // gives an array of matched entities.
//     console.log(data);
//     if(data.length>0){
//         res.send(data);
//     }
//     else{
//         res.send("NO TEACHER....");
//     }
// })

// Get list of all teachers : /
app.get("/", async (req, res) => {
    // Path to the JSON file where teachers are stored
    const filePath = path.join(__dirname, 'teachers.json');

    try {
        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Read the existing teachers from the file
            const fileData = fs.readFileSync(filePath, 'utf8');
            const teachers = JSON.parse(fileData);

            // Check if there are any teachers in the file
            if (teachers.length > 0) {
                res.status(200).json(teachers);
            } else {
                res.status(200).send("NO TEACHERS...");
            }
        } else {
            res.status(200).send("NO TEACHERS...");
        }
    } catch (error) {
        console.log("ERROR!!!");
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});


// // Get list of particular teacher :
// app.get("/get/:mail",async(req,res)=>{
//     console.log("REQ PARAMS : "+req.params.mail);
//     const data = await teacher.find({mail:req.params.mail});  // fetching details of teacher with mail as req.params.mail.
//     console.log(data);
//     if(data.length!=0){
//         res.send(data);
//     }
//     else{
//         res.send("NO TEACHER WITH MAIL ${req.params.mail}");
//     }
// })

// Get list of particular teacher by email : /get/:mail
app.get("/get/:mail", async (req, res) => {
    console.log("REQ PARAMS : " + req.params.mail);

    // Path to the JSON file where teachers are stored
    const filePath = path.join(__dirname, 'teachers.json');
    console.log(filePath);
    try {
        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Read the existing teachers from the file
            const fileData = fs.readFileSync(filePath, 'utf8');
            const teachers = JSON.parse(fileData);

            // Find the teacher with the specified email
            const teacher = teachers.find(teacher => teacher.mail === req.params.mail);

            // Check if the teacher exists
            if (teacher) {
                res.status(200).json(teacher);
            } else {
                res.status(404).send(`NO TEACHER WITH MAIL ${req.params.mail}`);
            }
        } else {
            res.status(404).send("NO TEACHER DATA AVAILABLE");
        }
    } catch (error) {
        console.log("ERROR!!!");
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

// // Get list of particular teacher with mail & password:
// app.get("/get/:mail/:password",async(req,res)=>{
//     console.log("REQ PARAMS : "+req.params.mail);
//     const data = await teacher.find({mail:req.params.mail,password:req.params.password});  // fetching details of teacher with mail as req.params.mail.
//     console.log(data);
//     if(data.length!=0){
//         res.send(data);
//     }
//     else{
//         res.send("NO TEACHER WITH MAIL ${req.params.mail}");
//     }
// })
// Get teacher details by email and password: /get/:mail/:password
app.get("/get/:mail/:password", async (req, res) => {
    console.log("REQ PARAMS : " + req.params.mail);

    // Path to the JSON file where teachers are stored
    const filePath = path.join(__dirname, 'teachers.json');

    try {
        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Read the existing teachers from the file
            const fileData = fs.readFileSync(filePath, 'utf8');
            const teachers = JSON.parse(fileData);

            // Find the teacher with the specified email and password
            const teacher = teachers.find(
                teacher => teacher.mail === req.params.mail && teacher.password === req.params.password
            );

            // Check if the teacher exists
            if (teacher) {
                res.status(200).json(teacher);
            } else {
                res.status(404).send(`NO TEACHER WITH EMAIL ${req.params.mail}`);
            }
        } else {
            res.status(404).send("NO TEACHER DATA AVAILABLE");
        }
    } catch (error) {
        console.log("ERROR!!!");
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});


// // Delete teacher :
// app.delete("/delete/:mail/:password",async(req,res)=>{
//     console.log("REQ PARAMS : "+req.params.mail);
//     try{
//         const data = await teacher.findOneAndDelete({mail:req.params.mail,password:req.params.password});  // fetching details of teacher with mail as req.params.mail & deleting it.
//         res.send("DATA DELETED !!!!!! ");
//     }
//     catch(err){
//         console.log(err.message);
//         res.send("ERRROR!!!!!!!!");
//     }
// })

// Delete teacher : /delete/:mail/:password
app.delete("/delete/:mail/:password", async (req, res) => {
    console.log("REQ PARAMS : " + req.params.mail);

    // Path to the JSON file where teachers are stored
    const filePath = path.join(__dirname, 'teachers.json');

    try {
        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Read the existing teachers from the file
            const fileData = fs.readFileSync(filePath, 'utf8');
            let teachers = JSON.parse(fileData);

            // Find the index of the teacher with the specified email and password
            const teacherIndex = teachers.findIndex(
                teacher => teacher.mail === req.params.mail && teacher.password === req.params.password
            );

            if (teacherIndex !== -1) {
                // Remove the teacher from the array
                const deletedTeacher = teachers.splice(teacherIndex, 1);

                // Save the updated teachers array back to the JSON file
                fs.writeFileSync(filePath, JSON.stringify(teachers, null, 2), 'utf8');

                console.log("DATA DELETED: ");
                console.log(deletedTeacher);
                res.status(200).send("DATA DELETED !!!!!!");
            } else {
                res.status(404).send("NO TEACHER FOUND WITH GIVEN EMAIL AND PASSWORD");
            }
        } else {
            res.status(404).send("NO TEACHER DATA AVAILABLE");
        }
    } catch (err) {
        console.log("ERROR!!!");
        console.log(err.message);
        res.status(500).send("ERROR!!!");
    }
});




// // Update Teacher:
// app.put("/update/:mail/:password",async(req,res)=>{
//     try{
//         let tchr = await teacher.findOne({mail:req.params.mail,password:req.params.password});
//         if(!tchr){
//             throw new Error("User not found");
//         }
//         let data = req.body;
//         // console.log("DATA + "+ data.name);
//         // console.log("TCHR : " + tchr);
//         tchr.name = data.name || tchr.name;
//         tchr.age = data.age || tchr.age;
//         tchr.department = data.department || tchr.department;
//         tchr.address = data.address || tchr.address;
//         let result = await tchr.save();
//         console.log(result);
//         res.status(200).json(result);
//     }
//     catch(error){
//         console.log(error.message);
//         res.send("ERRROR, NO MATCH FOUND!!!");
//     }
// })
// Update Teacher : /update/:mail/:password
app.put("/update/:mail/:password", async (req, res) => {
    console.log("REQ PARAMS : " + req.params.mail);

    // Path to the JSON file where teachers are stored
    const filePath = path.join(__dirname, 'teachers.json');

    try {
        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Read the existing teachers from the file
            const fileData = fs.readFileSync(filePath, 'utf8');
            let teachers = JSON.parse(fileData);

            // Find the index of the teacher with the specified email and password
            const teacherIndex = teachers.findIndex(
                teacher => teacher.mail === req.params.mail && teacher.password === req.params.password
            );

            if (teacherIndex === -1) {
                return res.status(404).send("User not found");
            }

            // Update the teacher's details
            const data = req.body;
            teachers[teacherIndex].name = data.name || teachers[teacherIndex].name;
            teachers[teacherIndex].age = data.age || teachers[teacherIndex].age;
            teachers[teacherIndex].department = data.department || teachers[teacherIndex].department;
            teachers[teacherIndex].address = data.address || teachers[teacherIndex].address;

            // Save the updated teachers array back to the JSON file
            fs.writeFileSync(filePath, JSON.stringify(teachers, null, 2), 'utf8');

            console.log("Updated Teacher : ", teachers[teacherIndex]);
            res.status(200).json(teachers[teacherIndex]);
        } else {
            res.status(404).send("No teacher data available");
        }
    } catch (error) {
        console.log("ERROR!!!");
        console.log(error.message);
        res.status(500).send("ERROR, NO MATCH FOUND!!!");
    }
});





app.listen(9000,(err)=>console.log("running on port 9000"));