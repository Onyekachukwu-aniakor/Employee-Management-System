import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer'
import connectDB from './config/db.js';

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
  })

  


connectDB();
  app.listen(port, (req,res)=>{
    console.log(`server running on http://localhost:${port}`)
  })

