const axios = require("axios")

// exports.homeRoutes = (req,res) => {
//     res.render("index")
// }

exports.homeRoutes = (req,res) => {
    //Make a get request to /api/users

    //calling get request of axios library
    axios.get("http://localhost:5000/api/users")
    .then(function(response){
        //Inside this response, there's data property. And inside the data property
        //there's all the records of the mongodb database
        res.render("index", {users: response.data})
    })
    .catch(err => {
        res.send(err)
    })

}

exports.add_user = (req,res) => {
    res.render("add_user")
}

exports.update_user = (req,res) => {

    //to return the former details of the individual with the unique queried ID in _show.ejs
    axios.get("http://localhost:5000/api/users", {params: {id: req.query.id}})
    .then(function(userdata){
        res.render("update_user", {user: userdata.data})
    })
    .catch(err => {
        res.send(err)
    })

    // res.render("update_user")
}