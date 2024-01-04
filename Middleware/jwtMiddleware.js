//middileware have the potential to control the request response cycle.
//two types of middileware
// application middileware and routing middileware
// entire project can apply where as it stands for particular path.

// import jwt
const jwt = require('jsonwebtoken')

const jwtMiddleWare = (req,res,next)=>{
    console.log('inside jwt middleWare');
    const token = req.headers['authorization'].split(' ')[1] 
    console.log(token);
    try
    {
        const jwtResponse = jwt.verify(token,"supersecretekey12345") // verify returns an object which contains the secret information and the iat key which the additional info (time of issue of jwt token)
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        
    }
    catch(err)
    {
        res.status(401).json('Authorization failed .... please login')
    }
    next();

    
}

module.exports = jwtMiddleWare