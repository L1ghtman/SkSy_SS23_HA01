const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const fs = require('fs').promises;

const app = express();

app.set("view engine", "ejs");


var corsOptions = {
    origin: 'http://localhost:4711'
};

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');

/*
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database!');
}).catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
});*/

function serve(path, req, res) {
    fs.readFile(__dirname + path) 
        .then(contents => {
            res.writeHead(200);
            res.end(contents);
        })
}

// CRUD:

// READ:
app.get('/', (req, res) => {
    serve('/index.html', req, res);
    //res.render("index");
});
app.get('/index.html', (req, res) => {
    serve('/index.html', req, res);
});
app.get('/Edit.html', (req, res) => {
    serve('/Edit.html', req, res);
});
app.get('/New.html', (req, res) => {
    serve('/New.html', req, res);
});

// CREATE:
app.post('/New.html', (req, res) => {
    console.log(req.body);
    res.json();
});

// UPDATE:
app.put('/Edit.html', (req, res) => {

});

// DELETE:
app.delete('/', (req, res) => {
    
});
app.delete('/index.html', (req, res) => {

});

require('./app/routes/todo.routes')(app);

const PORT = process.env.PORT || 4711;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

