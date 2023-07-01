const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const DB = 'mongodb+srv://arnavj:Zx9u4NKOaYeRbKUp@cluster0.6ia4ajz.mongodb.net/basic_database?retryWrites=true&w=majority';
const Asset = require('./models/assetSchema');
const User = require('./models/userSchema');
dotenv.config({path: './config.env'});
app.use(express.json());

//Connecting to the database:
mongoose.connect(DB).then(() => {
  console.log("DB Connected");
}).catch((err) => {
  console.error("DB Connection Error:", err);
  process.exit(1);
});

//To avoid cors error
const cors = require('cors');
app.use(cors());

//For registration page
app.post('/Registration', async (req, res) => {

  const { name, email, mobile, work, password } = req.body;

  if (!name || !email || !mobile || !work || !password) {
    return res.json({ error: "Please fill the fields properly" })
  }

  try {
    const userExist = await User.findOne({ email: email })

    if (userExist) {
      res.json({ error: "Email already Exists" });
    }

    const user = new User({ name, email, mobile, work, password, confirmation: 'No' });


    const userRegister = await user.save()
    if (userRegister) {
      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(500).json({ message: "Failed to register user" });
    }
  } catch (err) {
    console.log(err);
  }

})

//For login page
app.post("/Login", async (req, res) => {

  try {
    const { email, password, work } = req.body;
    const check = await User.findOne({ email: email, password: password, work: work, confirmation:"Yes" });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

//For administrator page
app.post('/Administrator', (req, res) => {
  const { assetClass, modelNumber, manufactureDate, email } = req.body;

  const asset = new Asset({
    assetClass, modelNumber, manufactureDate, email
  });

  // Save the user to the database
  asset.save()
    .then(() => {
      res.status(201).json({ message: "Asset added successfull" });
    })
    .catch((err) => {
      console.error("Asset Add Error:", err);
      res.status(500).json({ message: "Failed to add asset" });
    });
});

//Getting the information of all the users
app.get('/Employe', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});

//For employee page
app.get('/Employee', async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});

//Updating the confirmation status of the employee
app.patch('/Employe/:_id', (req, res) => {
  const { _id } = req.params;
  const { confirmation } = req.body;
  console.log(_id);
  User.findByIdAndUpdate(_id, { confirmation }, { new: true })
    .then((updatedUser) => {
      console.log(updatedUser);
      res.json(updatedUser);
    })
    .catch((error) => {
      console.error('Error updating confirmation status:', error);
      res.status(500).json({ message: 'Failed to update confirmation status' });
    });
});

//Updating the confirmation status of assets assigned
app.patch('/Employee/:_id', (req, res) => {
  const { _id } = req.params;
  const { confirmation } = req.body;
  console.log(_id);
  Asset.findByIdAndUpdate(_id, { confirmation }, { new: true })
    .then((updatedAsset) => {
      console.log(updatedAsset);
      res.json(updatedAsset);
    })
    .catch((error) => {
      console.error('Error updating confirmation status:', error);
      res.status(500).json({ message: 'Failed to update confirmation status' });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});