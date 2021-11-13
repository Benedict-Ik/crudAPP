//Custom JS File

//Displays message when user clicks on submit
$("#add_user").submit(function(event){
    alert("Data Inserted Successfully")
})


//updating users
$("#update_user").submit(function(event){
    event.preventDefault() //stops browser from reloading

    //retrieve all data from submitted form
    // var unindexed_array = $("#update_user")
    var unindexed_array = $(this).serializeArray(); //returns a serialized array of the data (converts an array to strings)
    var data = {}   


    $.map(unindexed_array, function(n,i){ //creates an array by calling a specific function on each element present in the unindexed array
        data[n['name']] = n['value']
    })
    

    console.log(data)

    var request = {
        "url": `http://localhost:5000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }


    $.ajax(request).done(function(response){
        alert("Data updated successfully!")
    }) 

})


//deleting 
//routed from _show.ejs delete icon

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")


        var request = {
            "url": `http://localhost:5000/api/users/${id}`,
            "method": "DELETE"
        }

        if(confirm("Are you sure you want to delete the user?")){
            $.ajax(request).done(function(response){
                alert("Data deleted successfully!")
                location.reload()
            }) 
        }

    })
}