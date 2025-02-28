const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise')
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const port = 2000;



let conn = null
const initMySQL = async () => {
 conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'taskmanage',
    port: 5000
  })
}

const validateData = (TaskData) => {
    let errors = []
        if (!TaskData.title) {
          errors.push('กรุณากรอกชื่อ')
        }
        if (!TaskData.description || null) {
          errors.push('กรุณากรอกรายละเอียด')
        }
        if (!TaskData.status) {
          errors.push('กรุณากรอกสถานะ')
        }
        if (!TaskData.due_date || null) {
            errors.push('กรุณากรอกวันที่')
        }
      
      return errors
  }
  
  app.get('/tasking', async(req, res) => {
    const results = await conn.query('SELECT * FROM tasking')
    res.json(results[0])
  })
  
  app.get('/tasking/:id', async(req, res) => {
    try{
      let id = req.params.id
      console.log('ID',id)
      const results = await conn.query('SELECT * FROM tasking WHERE id = ?', id)
      if (results[0].length === 0) {
        throw { statusCode: 404,message: 'ไม่พบข้อมูล'
        }
      } 
      res.json(results[0][0])
    }catch (error){
      console.log('errorMessage',error.message)
      let statusCode = error.statusCode || 500
      res.status(statusCode).json({
        message: error.message
      })
    }
  })
  
  app.post('/tasking', async(req, res) => {
    try{
      let task = req.body;
      const errors = validateData(task)
      if (errors.length > 0) {
        throw {
          message: 'กรอกข้อมูลไม่ครบ',
          errors: errors
        }
      }
      const results = await conn.query('INSERT INTO tasking SET ?', task)
      res.json({
        message: 'สำเร็จ',
        data:results[0]
      })
    }catch (error){
      const errorMessage = error.errors || 'something went wrong'
      const errors = error.errors || []
      console.log('errorMessage',error.message)
      res.status(500).json({
        message: errorMessage,
        errors: errors
      })
    }
  })
  
  
  
  app.put('/tasking/:id', async(req, res) => {
    try{
      let id = req.params.id;
      let updateTask = req.body;
      const results = await conn.query('UPDATE tasking SET ? WHERE id = ?', [updateTask, id])
      res.json({
        message: 'แก้ไขข้อมูลสำเร็จ',
        data: results[0]
      })
    } catch (error){
      console.log('errorMessage',error.message)
      res.status(500).json({
        message: 'บางอย่างผิดพลาด'
      })
    }
  })
  
  app.delete('/tasking/id', async(req, res) => {
    try{
      let id = req.params.id;
      const results = await conn.query('DELETE FROM tasking WHERE id = ?', id)
      res.json({
        message: 'ลบข้อมูลสำเร็จ',
        data: results[0]
      })
    }catch (error){
      console.log('errorMessage',error.message)
      res.status(500).json({
        message: 'บางอย่างผิดพลาด'
      })
    }
  })


app.listen(port, async(req, res) => {
    await initMySQL()
      console.log('http server running on', + port);
  })