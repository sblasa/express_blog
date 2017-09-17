const express = require("express"),
    bodyParser = require("body-parser"),
    fs = require("fs"),
    fileName = "data/customerMessages.json",
    app = express();

    app.use(express.static("public"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    var customerMessages = [];

    var CustomerMessage = function CustomerMessage (fName,lName,message) {
        this.FirstName = fName;
        this.LastName = lName;
        this.Message = message;
    };

app.get("/", function (req, res) {
    res.send("Why, hello there!");
});

//NOTE: )req, res) => {} is the same as function (req,res) {}
app.get("/about", (req, res)=>{
    res.send("<h1>About Us</h1>");

});

app.get("/messages", (req,res)=> {
    var message = "";
    for(var i= 0; i < customerMessages.length; i++) {
        var curMessage = customerMessages[i];
        message += "<div>";
        message += "<h1>" + curMessage.FirstName + " " + curMessage.LastName + "</h1>";
        message += "<p>" + curMessage.Message + "<p>"; 
        message += "</div>";
    }
    res.send(message);
});

app.post("/contact", (req, res)=> {
    var body = req.body;

    var newMessage = new CustomerMessage(body["first-name"]
    , body["last-name"], body.message);
    customerMessages.push(newMessage);
    writeCustomerMessages();


    res.send("Received Your Submission from " + body["first-name"] + " "
    + body["last-name"]);
});

app.get("/contact", (req, res)=> {
    res.send("Received Your Submission via GET");
});


var writeCustomerMessages = function writeCustomerMessages() {
    fs.writeFile(fileName, JSON.stringify (customerMessages), (err)=>{
        if(err) {
            throw err;

        } else {
            console.log("Wrote the customer messages file.");

        }
    })
};

var readCustomerMessages = function readCustomerMessages () {
   fs.readFile(fileName, "utf8", (err,data)=>{
        customerMessages = JSON.parse(data);
    });
};

app.listen(6000, function(){
    console.log("My app is working an listening on port: 6000.");
    readCustomerMessages();
});