

const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');

let app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.listen(process.env.PORT || 3000);
console.log('Server is running on port 3000');

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.get('/', function (req,res) {

	res.render('index');
});

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.post('/contact/send',function (req,res) {
	let transport=nodemailer.createTransport({
		service:'gmail',
		auth:{
			user:'expressmail.jaimego@gmail.com',
			pass:'alotofletters77-'
		}
	});

	let mailOptions = {
		from: 'Jaime González <expressmail.jaimego@gmail.com>',
		to: 'expressmail.jaimego@gmail.com',
		subject: 'Express Mailer Submission',
		text: 'You have a submission with the following details: Name: '+req.body.name+'Email: '+req.body.email+'Message: '+req.body.message,
		html: '<p>You have a submission with the following details:</p><ul><li>'+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transport.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});

});

