const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middleware/error')
const manufacturer = require('./router/manufacturer');
const phone = require('./router/phone');

const app = express();



//middleware 
app.use(express.json());

app.use(fileUpload());


app.use(cors());
app.use((req, res, next) => {
  console.log('req received' + req.body)
  next();
})

app.use('/api', manufacturer);
app.use('/api', phone);

//handle unhandled routes
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route NOT FOUND`, 404));
});

//middleware to handle errors
app.use(errorMiddleware);


//connect to the database
const connectDatabase = () => {
  mongoose
    .connect('mongodb://localhost:27017/mydbname', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((con) => {
      console.log(
        `MongoDb databse connected with host: ${con.connection.host}`
      );
    });
};
connectDatabase();
const port = 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})

//handling unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server due to Unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});

//handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR : ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

