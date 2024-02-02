
With the application you created in the Deliverable 8, create some routing for the application/website. Next 
Create a MongoDB and fill with some common store items.  Connect your DB to your application and get your 
application to populate from your DB. 

Remember to keep it simple but functional as this assignment shouldn't take too long.

// inside my views folder I have the base.ejs, dashboard.ejs, footer.ejs, and header.ejs Files

here is my base.ejs File
<%- include('header') -%>


<div class="text-center center-div" id="login">
    <div class="container w-25 border py-5">
        <div class="title pb-5">
            <h2 class="font-weight-bold">Login System</h2>
            <span>Log in for the existing user</span>
            <% if (locals.logout) { %>
                <div class="alter alert-success text-center">
                    <%= logout %>
                </div>
            <% } %>
        </div>
        <form action="/route/login" method="POST" class="pt-3">
            <div class="form-group">
                <input type="email" class="form-control" placeholder="email" name="email">
                <small class="form-text text-muted text-left">Register email address</small>
            </div>
            <div class="form-group">
                <input type="password" class="form-control" name="password" placeholder="password">
            </div>
            <button type="submit" class="btn btn-success rounded-pill">Submit</button>
        </form>
    </div>
</div>


<%- include('footer') -%>


here is my dashboard.ejs File
<%- include('header') -%>

<div class="text-center center-div mt-5" id="login">
    <div class="container w-25 border py-5 mt-5">
        <h3>Welcome to Express Dashboard</h3>
        <h5><%= locals.user ? user : "User" %></h5>
        <a href="/route/logout">Logout</a>
    </div>
</div>

<%- include('footer') -%>



here is my footer.ejs File
</body>
</html>



// here is my header.ejs File
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title><%= locals.title ? title : 'Login System'  %></title>


//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" 
//         integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">


// </head>
// <body>



// here is my router.js file
// var express = require ("express");
// var router = express.Router ();

// const  credential = {
//     email : "admin@gmail.com",
//     password : "admin123"
// }


// router.post ('/login', (req, res)=>{
//     if (req.body.email == credential.email && req.body.password == credential.password){
//         req.session.user = req.body.email;
//         res.redirect ('/route/dashboard');
//     } else {
//         res.end ("Invalid Username")
//     }
// });


// router.get ('/dashboard', (req, res) => {
//     if (req.session.user){
//         res.render ('dashboard', {user : req.session.user})
//     } else {
//         res.send ("Unauthorize User")
//     }
// });


// router.get ('/logout', (req ,res)=>{
//     req.session.destroy (function (err) {
//         if (err){
//             console.log (err);
//             res.send ("Error")
//         } else {
//             res.render ('base', {title: "Express", logout : "logout Successfully...!"});
//         }
//     });
// });

// module.exports = router;



// // here is my server.js file
// const express = require ('express');
// const path = require ('path');
// const bodyparser = require ("body-parser");
// const session = require ("express-session");
// const {v4: uuidv4} = require ("uuid");

// const router = require ('./router');

// const app = express ();

// const port = process.env.PORT || 3000;

// app.use (bodyparser.json());
// app.use (bodyparser.urlencoded ({extended: true}))

// app.set ('view engine', 'ejs');



// app.use (session({
//     secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
//     resave: false,
//     saveUninitialized: true
// }));

// app.use ('/route', router);

// app.get ('/', (req, res) =>{
//     res.render ('base', { title : "Login System"});
// })

// app.listen (port, ()=>{console.log("Lostening to the server on http://localhost:3000")});

