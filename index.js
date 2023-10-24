const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = 4012;
const url = "mongodb://0.0.0.0:27017/try";
app.use(express.json());

mongoose.connect(url)
  .then(() => {
    app.listen(port, () => {
      console.log("Server listening on port", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const demoSchema = new mongoose.Schema({
  Name: {
    type: String,
    validate: {
      validator: function (value) {
        return value.length >=3  && value.length <= 10;
      },
      message: "Name must be between 1 to 10 characters.",
    },
  },

  age: {
    type: Number,
    validate: {
      validator: function (value) {
        return value >= 18 && value <=50;
      },
      message: "age is not a valid age. Age must be at least 18."
    },
  },

  password: {
    type: String,
    validate: {
      validator: function (value) {
        return value.length >= 6 && value.length <= 20;
      },
      message: "Password must be between 6 to 20 characters.",
    },
  },
});

const validation = mongoose.model("validation", demoSchema);

app.post("/api", async (req, res) => {
  try {
    const data = req.body;
    if (data.Name && data.Name.length < 3 || data.Name && data.length > 10) {
      res.status(400).send("Name must be at least 3 characters.");
    }
    else if (data.password && data.password.length < 6 || data.password && data.password > 20) {
      res.status(400).send("Password must be at least 6 characters.");
    }
    else{
      const savedData = await validation.create(data);
    res.send(savedData);
    console.log("User updated successfully");
    }

  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).send("age not valid age must be between 18 to 50");
    } else {
      console.log(error);
      res.status(500).send("Failed to save data.");
    }
  }
});








































// const express = require("express");


// const app = express();
// const mongoose = require("mongoose");
// // const Joi = require("joi");

// const port = 4012;
// const url = "mongodb://0.0.0.0:27017/try";
// app.use(express.json());

// mongoose.connect (url)
//   .then(() => {
//     app.listen(port, () => {
//       console.log("Server listening on port", port);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//   // custom schema

// const demoSchema = new mongoose.Schema({
//     Name: {
//     type: String,
//     // required: true,
//     validate: {
//       validator: function (value) {
//         return value.length >= 1 && value.length <= 10;
//       },
//       message: "Name must be between 1 to 10",
//     },
//   },
  
//     age: {
//     type: Number,
//     // required: true,
//     validate: {
//       validator: function (value) {
//         return value >= 18;
//       },
//       message: "Age must be between 18 and 50.",
//     },
//   },
// });



// const validation =new mongoose.model("validation", demoSchema);

// app.post("/api", async (req, res) => {
//  try {
//    const data = req.body;
//    const savedData = await validation.create(data)
//    res.send(savedData)
//    console.log("user updated successfully");
//  } catch (error) {
//       console.log(error);
//  }
// })

