// to setup path to resolve request

// 1- import express
const express = require('express')

// import userController

const usrCntr = require('../controllers/userController')

// import projectController
const projCntr = require('../controllers/projectController')

// import jwtmiddleware
const jwtMiddleWare = require('../Middleware/jwtMiddleware')

// import multerMiddleware
const multerConfig = require('../Middleware/multerMiddle')

// 2- create an object for router() class in the express module
const router = new express.Router();

// 3- path to resolve the request
    // syntax = router.httpreq('path',()=>{how to solve})
    // a- register
        router.post("/user/register",usrCntr.register)

    // b-login 
        router.post("/user/login",usrCntr.login)  
        
    // c- add project
        router.post("/project/add",jwtMiddleWare,multerConfig.single("projectImage"),projCntr.addProject)

    // d- home project
        router.get("/project/home-project",projCntr.getHomeProject)

    // e-  all project
         router.get("/project/all-project",jwtMiddleWare,projCntr.getAllProject)

    // f- userProject
         router.get("/user/all-project",jwtMiddleWare,projCntr.getUserProject)

    // g) editProject
            router.put('/project/edit/:id',jwtMiddleWare,multerConfig.single('projectImage'),projCntr.editUserProject)

    // e) deleteProject
            router.delete('/project/remove/:id',jwtMiddleWare,projCntr.deleteUserProject)

    // f) editprofile
            router.put('/user/edit',jwtMiddleWare,multerConfig.single('profile'),usrCntr.editUser)




// 4- export router
module.exports = router;