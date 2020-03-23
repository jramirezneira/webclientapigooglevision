const express = require('express');
const app = express();

 //accede al index  
app.get("/", function (req, res) {
    res.sendfile('index.html')
});

/* serves all the static files */
app.get(/^(.+)$/, function (req, res) {
    console.log('static file request : ' + req.params);
    res.sendfile(__dirname + req.params[0]);
});

var port = process.env.PORT || 5001;
app.listen(port, function () {
    console.log("Listening on " + port);
});
