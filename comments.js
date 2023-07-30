// create web server  with express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// get all comments
app.get('/comments', function (req, res) {
    fs.readFile('./comments.json', 'utf8', function(err, data) {
        if (err) throw err;
        res.send(data);
    });
});

// add new comment
app.post('/comments', function (req, res) {
    var newComment = req.body;
    fs.readFile('./comments.json', 'utf8', function(err, data) {
        if (err) throw err;
        var comments = JSON.parse(data);
        comments.push(newComment);
        fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
            if (err) throw err;
            res.send(comments);
        });
    });
});

// delete comment
app.delete('/comments/:id', function (req, res) {
    var id = req.params.id;
    fs.readFile('./comments.json', 'utf8', function(err, data) {
        if (err) throw err;
        var comments = JSON.parse(data);
        comments.splice(id, 1);
        fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
            if (err) throw err;
            res.send(comments);
        });
    });
});

// update comment
app.put('/comments/:id', function (req, res) {
    var id = req.params.id;
    var comment = req.body;
    fs.readFile('./comments.json', 'utf8', function(err, data) {
        if (err) throw err;
        var comments = JSON.parse(data);
        comments[id] = comment;
        fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
            if (err) throw err;
            res.send(comments);
        });
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});