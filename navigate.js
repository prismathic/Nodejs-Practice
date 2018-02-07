var http = require('http');
fs = require('fs')

function serveStaticFile(res,path,contentType, responseCode) {
    if (!responseCode) {responseCode = 200};
    //Check the parameters accepted by the readFile function
    fs.readFile(__dirname + path, function(err,data) {
        if(err) {
            res.writeHead(500, {'Content-Type' : 'text/plain'})
            res.end('500 - Internal Error');
        }
        else {
            res.writeHead(responseCode, {'Content-Type' : contentType})
            res.end(data)
        }
    });
}

http.createServer(function(req,res) {
    // normalize url by removing querystring, optional
    // trailing slash, and making it lowercase
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase(); //Note: Check for how this replace function works
    switch (path) {
        case "" : 
            serveStaticFile(res,'/public/home.html', 'text/html',)
            break;
        case "/about" :
            serveStaticFile(res,'/public/about.html', 'text/html',)
            break;
        case "/img/logo.jpg":
            serveStaticFile(res,'/public/img/logo.jpg', 'image/jpeg',)
            break;
        default:
            serveStaticFile(res, '/public/404.html', 'text/html',404);
break;


    }
}).listen(3000);
console.log('Server started on localhost:3000; press Ctrl-C to terminate....');
//Check for what readFile() function is in 

/*In this example, we’re being pretty unimaginative with our routing.
If you navigate to http://localhost:3000/about, the public/about.html
file is served. You could change the route to be anything you want,
and change the file to be anything you want. For example, if you had
a different About page for each day of the week, you could have files
public/about_mon.html, public/about_tue.html, and so on, and provide
logic in your routing to serve the appropriate page when the user
navigates to http://localhost:3000/about.

My notes: This is quite event-driven, it means I can serve a user a 
certain page based on his decisions*/