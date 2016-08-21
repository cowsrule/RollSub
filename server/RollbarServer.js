var argv = require('yargs')
    .usage('Usage: $0 --path=[JS Root]')
    .demand([ 'path' ])
    .argv;


var sublPath = 'subl.exe' || argv.subl;
var rootPath = argv.path;
var port = 6027 || argv.port;


var spawn = require('child_process').spawnSync;
var https = require('https');

var fs = require('fs');

var express = require('express');
var bodyParser = require('body-parser');


var app = express();

var keyDir = __dirname + '/ssl/';
var options =
{
    key: fs.readFileSync(keyDir + 'server.key'),
    ca: fs.readFileSync(keyDir + 'server.csr'),
    cert: fs.readFileSync(keyDir + 'server.crt')
};

app.use(express.bodyParser({ limit: '50mb' }));

app.use(allowCrossDomain);

app.use('/redir', function (req, res)
{
    var filename = req.query.file;
    var line = req.query.line;
    var col = req.query.col;

    var openArgs = [ '--command', 'open_file', (rootPath + filename) ];
    spawn(sublPath, openArgs);

    setTimeout(function ()
    {
        var overlayArgs = [ '--command', 'show_overlay { \"overlay\": \"goto\", \"text\": \":' + line + '\" }' ];
        spawn(sublPath, overlayArgs);

        var closeArgs = [ '--command', 'hide_overlay' ];
        spawn(sublPath, closeArgs);

        res.status(200).send({});
    }, 150);
});


https.createServer(options, app).listen(port, function ()
{
    console.log('HTTPS RollSub Server running at https://localhost:' + '%d', port);
});


function allowCrossDomain(req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.send(200);

    next();
}
