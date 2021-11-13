var userDB = require("../model/model")

//create and save new user
exports.create = (req, res) => {
    //validate request
    if (!req.body){
        res.status(400).send({message: "Content cannot be empty!"})
        return;
    }

    //new user document (rows in mysql)
    const user = new userDB({
        name: req.body.name,

        //new entries
        // firstName: req.body.firstName,
        // lastName: req.body.lastName,
        // /new entries

        email: req.body.email,
        gender: req.body.gender,

        //new entry
        location: req.body.location,
        // /new entry
        status: req.body.status
       
    })

    //save user in mongoDB 
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect("/add-user")
        })
        .catch(err => {
            res.status(500).send({
                message:err.message || "Some error occured while creating a create operation"
            });
        });
}


//retrieve and return all users or retrieve and return a single user
// exports.find = (req, res) => {
//     userDB.find()
//     .then(user => {
//         res.send(user)
//     })
//     .catch (err => {
//         res.status(500).send({
//             message:err.message || "Some error occured while retrieving user information"
//         });
//     })
// }


//retrieve and return all users or retrieve and return a single user
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id

        userDB.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: `Not found user with id ${id}`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message: `Error retrieving user with id ${id}`})
        })

    } else{
        userDB.find()
        .then(user => {
            res.send(user)
        })
        .catch (err => {
            res.status(500).send({
                message:err.message || "Some error occured while retrieving user information"
            });
        })
    }

  
}


//update a new identified user by user id
exports.update  = (req, res) => {
    if (!req.body){
        res.status(400).send({message: "Data to update cannot be empty!"})
        return;
    }

    const id = req.params.id
    userDB.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data){
                return res.status(404).send({message: `Cannot update user with ${id}. Maybe user not found`})
            }else{
                res.send(data) 
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error updating user information"})
        })
}


//Delete a user with specified user id in the request
exports.delete = (req, res) => {
  
    const id = req.params.id
    userDB.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                return res.status(404).send({message: `Cannot delete user with ${id}. Maybe ID is wrong`})
            }else{
                res.send({message: "User was deleted successfully!"}) 
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error deleting user information"})
        })
}