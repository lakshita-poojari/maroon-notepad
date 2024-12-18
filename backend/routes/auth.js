const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');



const JWT_SECRET = "learningJSX";

//ROUTE 1:  Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must contain atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success= false
    //  console.log(req.body);
    //  const user = User(req.body);
    //  user.save()

    const errors = validationResult(req); //If there is error return bad request and the error
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      //check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "sorry a user with the same email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      //   const jwtData = jwt.sign(data, JWT_SECRET);
      //   console.log(jwtData);
      // .then(user => res.json(user))
      // .catch(err => {
      //     console.log(err);
      //     res.status(400).json({ error: "Entered email is incorrect or already in use", message: err.message });
      // });

      //  res.send(req.body);

      //   res.json(user);

      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);

//ROUTE 2: Authenticate a user using : POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],
  async (req, res) => {
    let success= false

    const errors = validationResult(req); //If there is error return bad request and the error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success= false
        return res
          .status(400)
          .json({ error: "Please try to login with right Credential" });
      }

      const passwordComapre = await bcrypt.compare(password, user.password);
      if (!passwordComapre) {
        success= false
        return res
          .status(400)
          .json({success, error: "Please try to login with right credential" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);

// ROUTE 3: Get logged in uder detials using: POST "api/auth/getuser". Login required
router.post(
    "/getuser",
    fetchuser,
    async (req, res) => {
      try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );
module.exports = router;
