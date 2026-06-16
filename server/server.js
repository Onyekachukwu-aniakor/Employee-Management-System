import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer'
import connectDB from './config/db.js';
import employeesRouter from './routes/employeeRoutes.js';
import authRouter from './routes/authRoutes.js';
import profileRouter from './routes/profileRoutes.js';
import attendanceRouter from './routes/attendanceRoutes.js';
import leaveRouter from './routes/leaveRoutes.js';
import payslipRouter from './routes/payslipRoutes.js';
import dashbaordRouter from './routes/dashboardRoutes.js';

const app = express();
const port = process.env.PORT || 8000
  dotenv.config()
  
//Middleware
  app.use(cors());
  app.use(express.json());
  /* Returns a Multer instance that provides several methods for generating middleware that process files uploaded in multipart/form-data format.

The StorageEngine specified in storage will be used to store files. If storage is not set and dest is, files will be stored in dest on the local file system with random names. If neither are set, files will be stored in memory. */
  app.use(multer().none());

//Routes
  app.get('/', (req, res)=>{
    res.status(200).send('server very active');
  });
  app.use('/api/employees', employeesRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/profile', profileRouter)
  app.use('/api/attendance', attendanceRouter)
  app.use('/api/leave', leaveRouter)
  app.use('/api/payslips', payslipRouter)
  app.use('/api/dashboard', dashbaordRouter)

  


connectDB();
  app.listen(port, (req,res)=>{
    console.log(`server running on http://localhost:${port}`)
  })

