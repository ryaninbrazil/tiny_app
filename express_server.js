var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; 

app.set("view engine", "ejs");

function generateRandomString() {
    let text = "";
    let randstring = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
    for (i = 0; i < 6; i++) {
    text += randstring.charAt(Math.floor(Math.random() * randstring.length));
    } return text;
}

  var urlDatabase = {
    "b2xVn2": "http://www.lighthouselabs.ca",
    "9sm5xK": "http://www.google.com"
  };



app.get("/u/:shortURL", (req, res) => {
    let shortURL = req.params.shortURL;
    let longURL = urlDatabase[shortURL];
    res.redirect(longURL);
  });


app.get("/", (req, res) => {
  res.end("Hello!");
});


app.get("/urls.json", (req, res) => {
    res.json(urlDatabase);
});


app.get("/urls", (req, res) => {
    let templateVars = { urls: urlDatabase, rand:generateRandomString()  };
    res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
    res.render("urls_new");
  });

app.get("/urls/:id", (req, res) => {
    let shortURL = req.params.id;
    let longURL = req.params.id;
    let templateVars = { fullURL: urlDatabase[shortURL], shortURL: shortURL };
    res.render("urls_show", templateVars);
  });

  

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

  
app.post("/urls", (req, res) => {
    let shortURL = generateRandomString();
    let longURL = (req.body.longURL);
    urlDatabase[shortURL] = longURL;
    console.log(req.body);  
     res.send("Ok");         
  });

app.post("/urls/:id/delete", (req, res) => {
  let shortURL = req.params.id;
  delete urlDatabase[shortURL];
  res.redirect('/urls');

});
//

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});