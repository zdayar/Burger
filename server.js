var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 3500;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mju78ik,",
    database: "burgers_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Express and MySQL code goes here.
// Use Handlebars to render the main index.handlebars page
app.get("/", function(req, res) {
    connection.query("SELECT * FROM burgers;", function(err, data) {
        if (err) {
            return res.status(500).end();
        }

        res.render("index", { burgers: data });
    });
});

// Create a new burger
app.post("/api/burgers", function(req, res) {
    connection.query("INSERT INTO burgers (burger_name, devoured) VALUES (?, false)", [req.body.burger_name], function(err, result) {
        if (err) {
            return res.status(500).end();
        }

        // Send back the ID of the new burger
        res.json({ id: result.insertId });
        console.log({ id: result.insertId });
    });
});



// Devour (update) a burger
app.put("/api/burgers/:id", function(req, res) {
    connection.query("UPDATE burgers SET devoured = true WHERE id = ?", [req.params.id], function(err, result) {
        if (err) {
            // If an error occurred, send a generic server faliure
            return res.status(500).end();
        } else if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

app.listen(port, function () {
    console.log("Listening on PORT " + port);
});
