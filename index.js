//require express
const express = require('express');
const app = express();
const port = 20330; //initilize port

const fs = require('fs'); //require fs module(file system module)


// setting up parser for form
app.use(express.json());
app.use (express.urlencoded({extended : true }));

// setting up ejs and static file
const path = require('path'); //require path for views folder and public folder
app.set('view engine' , 'ejs');
app.use (express.static(path.join(__dirname , 'public')));


app.get('/',(req , res)=>{
    fs.readdir(`./files`,(err , files) =>{
        res.render("index" , {files : files})
    })
});

// make create route
app.post('/create',(req,res) =>{
    fs.writeFile(`./files/${req.body.title.split(' ').join("")}.txt`,req.body.detail , (err)=>{
        res.redirect("/")
    });
});

// create route name file for sending data in frontend

app.get('/file/:filename' , (req , res)=>{
    fs.readFile(`./files/${req . params .filename}`,"utf-8" , (err , detail) =>{
        res.render('show' , {filename : req.params.filename , detail:detail});
    })
})

//create edit rout
app.get('/edit/:filename',(req,res)=>{
    res.render("edit" , { filename: req.params.filename })
});

app.post('/edit',(req,res)=>{
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`,function(err){
        res.redirect('/');
    })
});

app.listen(port ,() =>{
    console.log(`port is listining on ${port}`);
});