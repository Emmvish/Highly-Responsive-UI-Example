A small MERN stack project that features three resizable and size-aware components in its UI. The components can be resized from any of their sides and this will cause other components to shrink or expand depending upon the space occupied by the targeted component in the container.

Uses an Express.js based server to host the React Application, and also has a well defined API in the backend built with the help of Node.js . One can add a name, update a name or view the number of documents currently there inside the MongoDB Collection, through the three React Components. API Execution times can also be enlisted.

Finally, the project is made to be of production quality by using Webpack to build the resource dependency graphs and use source maps. The port numbers for Express Server and MongoDB community server can be specified as environment variables in a configuration file.




PRE-REQUISITES:

Must have NodeJS and NPM installed on the PC.
Must have MongoDB community edition server installed and its data allocated to a certain directory.


INSTRUCTIONS TO GET STARTED:

1. Run "npm install" command to install all dependencies required to use this project.

2. (Optional) - You can define the port numbers for express server and mongodb server in config/dev.env file. Their default values are 3000 and 27017. Further up in this tutorial, it is assumed that those values were not modified in the config/dev.env file.

3. (Optional) - Run "npm run build" command to build the Babel-compiled front-end script called "bundle.js" using Webpack.

4. Start the MongoDB database server using a command similar to the following: /Users/user/mongodb/bin/mongod.exe --dbpath=/Users/user/mongodb-data
   (Just replace "user" with your own PC username, if mongod.exe file and mongodb-data directory are present at above mentioned paths.) Create a 
   new database called "Components" in this MongoDB server.

5. Start the Express server by using the command "npm run dev" while your present working directory is the root of this project. 

6. Open up your web browser and navigate to "http://localhost:3000" to view the React UI. 

7. (Optional) - You may install Robo 3T software (front-end of mongodb community server) and create the "Components" database using it. A    collection called "Names" is automatically created in this database when you add a new document into the collection using First Component of    React UI.

8. Second Component of React UI is used for updating a name in the "Names" collection of "Components" database.

9. All components can be resized on all 4 sides and corners.

10. You can note down the time required to execute the ADD, UPDATE and COUNT API calls by looking at the values printed on the console of express     server whenever the respective API is called.



TYPICAL API CALL EXECUTION TIMES

Following execution times are based on an average of 5 execution time values for each respective API call. 

/add

Success (200 OK response status received from server) - 7ms
Failure to Connect with Database (503 Service Unavailable status received from server) - 30 seconds

/update

Success (200 OK response status received from server) - 8ms
Failure when Document does not exist (200 OK response status received from server) - 51ms 
Failure to Connect with Database (503 Service Unavailable status received from server) - 30 seconds

/count

Successful Response when Page is loaded for the first time (200 OK response status received from server) - 51ms
Successful Response otherwise (200 OK response status received from server) - 13ms
Failure to Connect with Database (503 Service Unavailable status received from server) - 30 seconds
