
const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')

const twindlo = express()
twindlo.use(express.json())
twindlo.use(cors())

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const dbConfig = {
    host:'localhost',
    user:'root',
    password:'TWINDLO4242#',
    database:'twindlo'
}

let  db = null;

let intializer = async () =>{
    try{
       db = await mysql.createConnection(dbConfig)
       console.log('✅ Connected to MySQL database');
       twindlo.listen(3000,()=>{
         console.log('🚀 Server started on port 3000');
       })
    }

    catch(error) {
        console.log('Database connection failed',error)
        process.exit(1);
    }
}


intializer()




const authentication = (req, res, next) => {
  const { email, password } = req.body;

  const validateMail = mail => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(mail);
  };

  if (!email && !password) {
    return res.status(400).json({
      result: 'failed',
      message: 'Please enter email and password'
    });
  }

  else {

    if (!validateMail(email)) {
    return res.status(400).json({
      result: 'failed',
      message: 'Enter a valid email'
    });
   }
    else if (!password) {
    return res.status(400).json({
      result: 'failed',
      message: 'Please enter your password'
    });
  }
    else if(!email) {
    return res.status(400).json({
      result: 'failed',
      message: 'Please enter your email'
    });
   }
   
  else {
    next()

  }
   
  }
   
  
};



/// SIGN UP ///

twindlo.post('/signup', authentication ,async (request,response)=>{

    const {email,password,isVerified} = request.body
     const secretkey = 'insomnia'

    const checkExistingUser = 'SELECT * FROM users WHERE email=?'
    const [existingUser] = await db.execute(checkExistingUser,[email])
    const user = existingUser[0]
   
    if (existingUser.length>0){
        return response.status(400).json({
            result:'failed',
            message:'User with this email already exists.'
        })
    }

    const hashedPassword  =  await bcrypt.hash(password, 10)
    const addUserQuery  = 'INSERT INTO users (email,password) VALUES (?,?)';

    const payLoad = {email,isVerified}
    const jwtToken = jwt.sign(payLoad,secretkey)
    const [retrievedResponse] = await db.execute(addUserQuery,[email,hashedPassword])

    response.status(200).json({
             result:'success',
             success:true,
             message:'User Account Creation Intiated',
             jwtToken,
             recievedData:user
    })
})


/// SIGN IN ///

twindlo.post('/signin', authentication , async (request,response)=>{

    const {email,password} = request.body 
    const secretkey = 'insomnia'
    const signinQuery = 'SELECT * FROM users WHERE email=?'
    const [retrievedResponse] = await db.execute(signinQuery,[email])
  
    const user = retrievedResponse[0]
    
    

    if (retrievedResponse.length===0){
        return (
         response.status(401).json({
             result:'failed',
             message:'User Not Found',
         })
        )
    }
    
    const isPasswordMatch = await bcrypt.compare(password,user.password)
    if (!isPasswordMatch){
        return (
            response.status(400).json({
                result:'failed',
                message:'Invalid Password'
            })
        )
    }

    const payLoad = {id:user.id,email}
    const jwtToken = jwt.sign(payLoad , secretkey)
    return response.status(200).json({result:'success',message:'logged in successfully',jwtToken,user})
})