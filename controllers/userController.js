// logic to resolve the request

// import model 
const users = require('../Modals/userSchema')

// import jwt
const jwt = require('jsonwebtoken')

    // logic for register
    exports.register = async(req,res)=>{
    console.log(`inside controller register function`);

    // extract data from request body / in index.js file convert json data into javascript object
    const {username,email,password} = req.body;
   try{const existsUser = await users.findOne({email})
   if(existsUser)
   {
       res.status(406).json("User Alredy Exists...Please Login")
   }
   else
   {   //create an object foir the model
       const newUser = new users({
           username,
           email,
           password,
           github:"",
           linkedin:"",
           profile:""
       })
       // save function in mongoose - to permently store this data in mongodb
       await newUser.save()
       res.status(200).json(newUser)

   }} 
   catch(err){
    res.status(401).json(`Register request Failed due to,${err}`)
   }
}



// logic for login

exports.login = async(req,res)=>{
    console.log(`inside controller login function`);

    const {email,password} = req.body

    try{
        const existsUser = await users.findOne({email,password})
        console.log(existsUser);

        if(existsUser)
        {   
            const token = jwt.sign({userId:existsUser._id},"supersecretekey12345")// first argument is the data taht is send inside the token and the second argument is the key based on which the token is genarted

            res.status(200).json({
                existsUser,
                token
            })
        }
        else
        {
            res.status(406).json('Invalid Email or Password')
        }
    }catch(err)
    {
        res.status(401).json(`login failed due to  ${err}`)
    }
}

// edit profile

exports.editUser = async(req,res)=>{
    const userId = req.payload
    const {username,email,password,github,linkedin,profile}= req.body

    const profileImage = req.file?req.file.filename:profile
    try {
        const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:profileImage},{new:true})

        await updateUser.save()
        res.status(200).json(updateUser)
    } catch (err) {
        res.status(401).json(err)
    }
}