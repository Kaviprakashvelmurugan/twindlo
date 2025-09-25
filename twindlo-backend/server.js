
const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')

const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

const twindlo = express()
twindlo.use(express.json())
twindlo.use(bodyParser.json())
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



///Resend Setup///

const {Resend} = require('resend') 
const resend = new Resend(process.env.RESEND_API_KEY)





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
     
    const getIsVerified = 'SELECT isVerified FROM users WHERE email=?'
    const [dbResponse] = await db.execute(getIsVerified,[email])
    const {isVerified} = dbResponse[0]
    console.log(isVerified)
    const payLoad = {id:user.id,email,isVerified}
    const jwtToken = jwt.sign(payLoad , secretkey)
    return response.status(200).json({result:'success',message:'logged in successfully',jwtToken,user,success:true})
})



/// ONBOARDING QUESTIONS ///

twindlo.get('/onboarding-questions',async (request,response)=>{

const questions = [
  // Section 1: Basic Info
  { 
    id: 1, 
    field:'name',
    questionText: "Full Name / Nickname", 
    type: "text", 
    required: true, 
    subtext: "Hey! What should we call you in the Twindlo community?", 
    placeholder: "e.g., Kavi / Kaviprakash" 
  },
  { 
    id: 2, 
    field:"gender",
    questionText: "Gender", 
    type: "select", 
    required: true, 
     options: ["Male","Female"], 
    subtext: "Reveal your gender ! ", 
    placeholder: "Select your Gender",
  },
  { 
    id: 3, 
    field:'location',
    questionText: "Location (City / Country)", 
    type: "text", 
    required: true,  
    subtext: "Where are you joining us from? This helps connect you with local buddies.", 
    placeholder: "e.g., Chennai, India" 
  },

  // Section 2: Academic / Professional Background
  { 
    id:4,
    field :'educationLevel', 
    questionText: "Education Level", 
    type: "select", 
    placeholder: "Select your education level",
    options: ["High School", "Undergraduate", "Graduate", "Postgraduate", "Professional/Working"], 
    required: true, 
    subtext: "Your journey so far helps us suggest the right learning paths for you." 
  },
  {
    id:5, 
    field:'degree',
    questionText: "Degree", 
    type: "select", 
    placeholder: "Select your degree",
    options: ["B.Tech", "B.Sc", "M.Tech", "MBA", "PhD"], 
    required: true, 
    subtext: "Tell us your degree—it helps us match you with like-minded learners." 
  },
  { 
    id: 6, 
    field : 'department',
    questionText: "Department / Major", 
    type: "select", 
    placeholder: "Select your department",
    options: ["Computer Science", "Electronics", "Mechanical", "Civil", "Mathematics", "Physics", "Chemistry"], 
    required: true, 
    subtext: "Pick your department or major to help us connect you better." 
  },
  { 
    id:7,
    field:'YearOfStudy', 
    questionText: "Year of Study / Experience", 
    type: "select", 
    placeholder: "Select your year of study",
    options: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate", "Professional",'10th Grade', '11th Grade','12th Grade'],
    required: true, 
    subtext: "Where are you at in your journey? This helps us tailor your experience." 
  },

  // Section 3: Interests & Goals
  { 
    id:8, 
    field:"whyJoining",
    questionText: "Why are you joining Twindlo?", 
    type: "select", 
    placeholder: "Select your reason",
    options: ["Find Study Buddies", "Learn New Skills", "Build Descipline", "Project Collaboration", "Project Management"], 
    required: true, 
    subtext: "Let us know your goal—this helps us guide you better!" 
  },
  { 
    id: 9, 
    field : 'CourseOfInterest',
    questionText: "Subjects / Courses of Interest", 
    type: "checkbox", 
    options:[
           // Computer / IT
           "Python", "Java", "C++", "ReactJS", "NodeJS", "SQL", "Git",

           // 🏗 Civil Engineering
           "AutoCAD", "Revit", "StaadPro", "ArcGIS", "Survey", "BIM", "Matlab",

             // ⚡ Mechanical / Electrical
            "CATIA", "Ansys", "Simulink", "Fusion360", "Creo", "PLC", "VLSI",

            // 📊 Business / Management
           "Excel", "SPSS", "Tableau", "RStudio", "SEO", "FinTech", "SAP",

             // 🔬 Science (Physics, Chem, Bio)
            "Physics", "Chem", "Maths", "BioTech", "NanoTech", "Zoology", "Botany",

             // 🩺 Medical / Health
             "Anatomy", "Pharma", "Patho", "Physio", "Surgery", "Genetics", "Nursing",

            // 🎨 Arts / Design / Media
              "Drawing", "Sketch", "3DModel", "PhotoEdt", "FilmMkg", "Music", "Dance"
       ] ,
    required: true, 
    subtext: "Pick your favorite subjects or skills you want to discuss with Your buddy." 
  },
  { 
    id: 10,
    field:"workStyle" ,
    questionText: "Preferred Study / Work Style", 
    type: "select", 
    placeholder: "Select your study style",
    options: ["Solo", "Group", "Timed Challenges", "Project-Based"], 
    required: true, 
    subtext: "How do you love to learn? Choose your style!" 
  },

  // Section 4: Account  type
  { 
    id: 11,
    field:'accountType',
    questionText: "What type of account would you like to create?", 
    type: "select", 
    placeholder: "Select your Account type",
    options: ["public", 'private'], 
    required: true, 
    subtext: "Helps us to provide you the correct Environment" 
  },
  

  // Section 5: Optional Social / Profile Info
  { 
    id: 12, 
    field:"socialLink",
    questionText: "GitHub / LinkedIn / Portfolio URL", 
    type: "text", 
    required: true, 
    subtext: "Show off your work! Share your profiles if you’d like.", 
    placeholder: "e.g., https://github.com/username" 
  },

];




    response.status(200).json({
      success:true,
      result:'success',
      onboardingQuestions:questions
    })
})



/// send verify email ///

twindlo.post('/send-verify-email' , async (request,response)=>{
   const {email} = request.body
   const otp = Math.floor(Math.random()* 900000 + 10000)
   try {
       await resend.emails.send({
        from: 'Twindlo Verify <verify@twindlo.com>',
        to:email,
        subject:'Your Twindlo OTP code',
        html:`<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
      })

      response.status(200).json({
        result:'success',
        success:true,
        oneTimePassword:otp
      })
   }
  catch(error){
    console.log(error)
    response.status(400).json({
      result:'failed'
    })
  }
 
}) 


/// OTP verification and user updation

twindlo.post('/update-verify-status' , async (request,response)=>{
  const secretkey = 'insomnia'
  const {email,newMail,isVerified,answers} = request.body

  const defaultMaleProfiles = [
    'https://res.cloudinary.com/djtbynnte/image/upload/male-d-6_upn6la.png',
    'https://res.cloudinary.com/djtbynnte/image/upload/male-d-5_nxhp9i.png',
    'https://res.cloudinary.com/djtbynnte/image/upload/male-d-1_yjwlzw.png',
    'https://res.cloudinary.com/djtbynnte/image/upload/male-d-2_vy5rcp.png',
    'https://res.cloudinary.com/djtbynnte/image/upload/male-d-4_jsmukt.png'
  ]
  const defaultProfile = defaultMaleProfiles[Math.floor(Math.random()*defaultMaleProfiles.length)]


console.log(defaultProfile)
  const {CourseOfInterest,
         YearOfStudy,
         degree,
         department,
         educationLevel,
         location,
         name,
         socialLink,
         whyJoining,
         accountType,
         gender
        } = answers

  try{
     await db.beginTransaction()

     const userIdQuery = 'SELECT * From users WHERE email = ?'
     const [userRow] = await db.execute(userIdQuery,[email])
    
     if (userRow.length==0){
      db.rollback()
      return response.status(400).json({message:'User Not Found',success:false})
     }
     const userId = userRow[0].id
     console.log(userId)
     ///* UPDATING IS_VERIFIED *///

     const updateIsVerifiedQuery = 'UPDATE USERS  SET email = ? , isVerified = ?  WHERE email = ?'
     const [dbResponse] = await db.execute(updateIsVerifiedQuery,[newMail,isVerified,email])
     console.log('here',dbResponse.affectedRows)   
     const payLoad = {email:newMail,isVerified}
     const jwtToken = jwt.sign(payLoad,secretkey)
     

    ///* ADD PROFILE_DETAILS*///

    const addProfileDetails = 'INSERT INTO USER_PROFILES (  user_id,username,gender,location,education_level,degree,department,year_of_study,reason_to_join,account_type,github_link,profile_url) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);'
    const [dbProfileDetialsResponse] = await db.execute(addProfileDetails,[userId,name,gender,location,educationLevel,degree,department,YearOfStudy,whyJoining,accountType,socialLink,defaultProfile])
    


    /// INSERT INTERESTS ///
    
   
    if(CourseOfInterest.length>0){
      const values = CourseOfInterest.map(interest=>[userId,interest])
      const addInterestsQuery = 'INSERT INTO user_interests (user_id,interest) VALUES ?'
       await db.query(addInterestsQuery,[values])
    }
     

    await db.commit()
    response.status(200).json({message:'Updation Success', jwtToken})
  }
  catch(error){
    console.log(error)
     await db.rollback()
    response.status(400).json({message:'Wrong OTP Has been Entered !'})
  }

})