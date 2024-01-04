// import mangoose

const mangoose = require('mongoose')

// get the connection string
const connectionString = process.env.DATABASE
console.log(connectionString);

// connect node.js/server with mangoose
mangoose.connect(connectionString).then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(`MongoDb failed to connect due to ${err}`);
})