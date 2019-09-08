var express = require('express');
var favicon = require('serve-favicon');

var multer = require('multer');

var app = express();

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));


app.use(express.urlencoded());



var methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use(require('./controllers/user'));


var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Server started at ' + new Date() + ', on port ' + port + '!');
});

var User = require(__dirname + '/models/User');

//////////////////////////////////////////////////////////////////////////////////////
///////////////////////GET request handling (largely uncommented)/////////////////////
//////////////////////////////////////////////////////////////////////////////////////

app.get('/', function (request, response) {

    var log = {
        'timestamp': Date(),
        'httpverb': "GET",
        'username': "",
        'route': "/"
    }
    console.log(log);
//test
		response.render('index')


});

app.get('/about', function (request, response) {

    var log = {
        'timestamp': Date(),
        'httpverb': "GET",
        'username': "",
        'route': "/about"
    }
    console.log(log);

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('about');

});

app.get('/search', function (request, response) {

    var log = {
        'timestamp': Date(),
        'httpverb': "GET",
        'username': "",
        'route': "/search"
    }
    console.log(log);

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('search');

});






var textCreds = require('./models/client_secret_text.json')
const client = require('twilio')(textCreds["accountSid"], textCreds["authToken"]);


	var emailCreds = require('./models/client_secret_email.json')
	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: emailCreds
	});



//MAIN NOTIFICATION FUNCTION
function notify(email, phoneNumber, subject, emailMessage, textMessage){

if(phoneNumber!=""){
client.messages
  .create({
     body: textMessage,
     from: '+12673100368',
     to: ("+1"+phoneNumber.replace("-",""))
   })
  .then(message => console.log(message.sid));
}

var mailOptions = {
	from: 'penncoursealertplus@gmail.com',
	to: email,
	subject: subject,
	text: emailMessage
};


transporter.sendMail(mailOptions, function(error, info){
	console.log("sent")
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

}
