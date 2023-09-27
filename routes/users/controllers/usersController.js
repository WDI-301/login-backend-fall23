const User = require('../model/User')

module.exports = {
    login: async (req, res) => {
        try {
           // check if user exists / get the user from the db
           // if no user found throw an error
        
            // check if password matches
            // if a bad match, throw an error

            // return the found user object, response  
        } 
        catch (error) {
            // throw error messages go here
        }

       

    },
    register: async (req, res) => {
        try {
            // if foundUser exists throw an error
            let foundUser = await User.findOne({username: req.body.username})
            if (foundUser) {
                throw {
                    status: 409,
                    message: "User Exists"
                }
            }

            // create new User 
            let newUser = new User({
                username: req.body.username,
                password: req.body.password
            })

            //encrypt password
            
            //save newUser to the database
            let savedUser = await newUser.save()

            res.status(200).json({
                userObj: savedUser,
                message: "Successfully Registered"
            })

        }
        catch (error) {
            res.status(error.status).json(error.message)
        }
    }
}