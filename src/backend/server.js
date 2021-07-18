// Following package helps us to work with System Relative and Absolute paths
const path = require("path")

// Creating a Client Instance using which we can query MongoDB database and the collection stored inside of it
const MongoClient = require("mongodb").MongoClient;

const mongodbPort = process.env.MONGODB_PORT || 27017;

// Connection URL for MongoDB - assuming that MongoDB is active on Localhost and its default port 27017.
const mongodbUrl = "mongodb://127.0.0.1:" + mongodbPort;

// Creating and Initializing an Express based server
const express = require('express')
const app = express();

// Public Path refers to directory of ReactJS User Interface HTML file 
const publicPath = path.join(__dirname,"..","..","public")

// Setting up Express Server to use the above defined path to Public Directory
app.use(express.static(publicPath));

// Following step is required for parsing contents of "req.body" object to JSON format
app.use(express.json());


// Following endpoint is used for ADDING the name specified by user, into a specific collection of "Components" database, specified by the React Component that was used to querying the database on UI.
app.post("/add", (req,res)=>{
    // Noting down the time instant of initiation of API request
    let start = process.hrtime();
    // Using the MongoDB Client to connect with MongoDB using connection URL -- asynchronous call
    MongoClient.connect(mongodbUrl,{useNewUrlParser: true, useUnifiedTopology: true} ,(err,client)=>{
        if(!err){
            // This block is executed if connection with MongoDB was successfully established.

            // Selecting the database that we wish to query
            const db = client.db("Components");

            // Obtaining collection name from "req.body" object and selecting it from database
            const collection = db.collection(req.body.collection);

            // Inserting the name specified in "req.body" object
            collection.insertOne({
                name: req.body.name
            }).then(()=>{
                // Terminating the connection to MongoDB
                client.close();
            })
            // Informing the client that their query was successfully run.
            res.status(200).send("OK")
        } else {
            // This block is executed if connection with MongoDB was NOT established.

            // Informing the client that their query was NOT successful.
            res.status(503).send("Service Unavailable!");
        }
        // Noting down the time instant at which this API endpoint has responded to client
        let end = process.hrtime(start)
        // Evaluating the difference between initial and final time instants of API's execution 
        console.info('Execution time of ADD API: %ds %dms', end[0], end[1] / 1000000)
    })
})


// Following endpoint is used for UPDATING the name specified by user, which is present in a specific collection of "Components" database, specified by the React Component that was used to querying the database on UI.
app.post("/update", (req,res)=>{
    // Noting down the time instant of initiation of API request
    let start = process.hrtime();
    // Using the MongoDB Client to connect with MongoDB using connection URL -- asynchronous call
    MongoClient.connect(mongodbUrl,{useNewUrlParser: true, useUnifiedTopology: true} ,(err,client)=>{
        if(!err){
            // This block is executed if connection with MongoDB was successfully established.

            // Selecting the database that we wish to query
            const db = client.db("Components");

            // Obtaining collection name from "req.body" object and selecting it from database
            const collection = db.collection(req.body.collection);

            // Updating all those records in which "name" field matches the given name.
            collection.updateMany({
                name: req.body.oldName
            }, {$set: {
                name: req.body.newName
            }}).then(()=>{
                // Terminating the connection to MongoDB
                client.close();
            })

            // Informing the client that their query was successfully run.
            res.status(200).send("OK")
        } else {
            // This block is executed if connection with MongoDB was NOT established.

            // Informing the client that their query was NOT successful.
            res.status(503).send("Service Unavailable!");
        }

        // Noting down the time instant at which this API endpoint has responded to client
        let end = process.hrtime(start)
        // Evaluating the difference between initial and final time instants of API's execution 
        console.info('Execution time of UPDATE API: %ds %dms', end[0], end[1] / 1000000)
    })
})


// Following endpoint is used for obtaining the TOTAL NUMBER OF DOCUMENTS currently present inside of our database. This information is fetched and displayed by a React Component to check whether a particular document has been added to database or not.
app.get("/count", (req,res)=>{

    // Noting down the time instant of initiation of API request
    let start = process.hrtime();

    // Using the MongoDB Client to connect with MongoDB using connection URL -- asynchronous call
    MongoClient.connect(mongodbUrl,{useNewUrlParser: true, useUnifiedTopology: true} ,(err,client)=>{
        if(!err){
            // This block is executed if connection with MongoDB was successfully established.

            // Selecting the database that we wish to query            
            const db = client.db("Components");

            // Selecting collection name from database
            const collection = db.collection("Names");

            // Querying the collection to find all those documents for which Object Identifier exists. This list is then converted to an array whose length can be examined to find out total number of documents stored inside the collection.
            collection.find({_id: {$exists: true}}).toArray().then((arr)=>{           
                res.send({count: arr.length});
                client.close();
            });
        } else {
            // This block is executed if connection with MongoDB was NOT established.

            // Informing the client that their query was NOT successful.
            res.status(503).send("Service Unavailable!");
        }

        // Noting down the time instant at which this API endpoint has responded to client
        let end = process.hrtime(start)

        // Evaluating the difference between initial and final time instants of API's execution 
        console.info('Execution time of COUNT API: %ds %dms', end[0], end[1] / 1000000)
    })
})

app.get("/sample", (req, res)=>{
    res.status(200).send();
})

// Serve the React User Interface's HTML file if the URL's path does not match any of the above specified paths
app.get("*", (req,res)=>{
    res.status(201).sendFile(path.join(publicPath, "main.html"));
})

// Exporting the "app" express server whose routes have been configured above, to "app.js" file at root of "src" folder, so that the server can be made active on a certain port specified in the "dev.env" file. 
module.exports = app;