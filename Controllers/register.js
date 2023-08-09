const express = require('express')
const ExcelJS = require('exceljs');

const register = require('../Database/register')

const studentRegister = async(req,res,next)=>{

    try{

 

    const {name,email,contact,degree,branch,passingYear,collegeName} = req.body;

    if(!name || !email || !contact || !degree || !branch || !passingYear || !collegeName){

        return res.send({ error: "please add all the fields" })
    }

    if (name < 3) {

        return res.send({ error: "name should be atleast 3 characters long" })
    }

    let data =  await register.findOne({email:email})

    if(data){
        return res.send("user already exists")
    }

    const student = new register({
        name,email,contact,degree,branch,passingYear,collegeName
    })

    await student.save();

    res.status(201).json(student);

}
catch(error){
    res.status(400).json({ error: error.message });
}
}

const getStudentData = async(req,res,next)=>{

    try {
        const data = await register.find();
    
        // Generate Excel file
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Students');
        worksheet.columns = [
          { header: 'Name', key: 'name', width: 20 },
          { header: 'Email', key: 'email', width: 30 },
          { header: 'Contact', key: 'contact', width: 15 },
          { header: 'Degree', key: 'degree', width: 15 },
          { header: 'Branch', key: 'branch', width: 15 },
          { header: 'Passing Year', key: 'passingYear', width: 15 },
          { header: 'College Name', key: 'collegeName', width: 20 },
        ];
        data.forEach(student => {
          worksheet.addRow(student);
        });
    
        const excelBuffer = await workbook.xlsx.writeBuffer();
        // Set response headers for Excel download
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename=students.xlsx',
            'Content-Length': excelBuffer.length,
          });
      
          res.send(excelBuffer);
       
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}
module.exports={studentRegister,getStudentData}