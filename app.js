var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios')
var path = require('path');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

const logger = (req, res, next) => {
    if(typeof process.env.INSTAGRAM_ACCESS_TOKEN === 'undefined') {
        console.log('instagram access token is undefined');
    } 
    if(process.env.INSTAGRAM_ACCESS_TOKEN == null) {
        console.log('instagram access token is null');
    }
    if(process.env.INSTAGRAM_ACCESS_TOKEN.length === 0) {
        console.log('access token is undefined');
    }
    next();
}

app.use(logger);

app.get('/', async (req, res, next) => {
    try {
        var access_token = process.env.INSTAGRAM_ACCESS_TOKEN;
        var requestUri = "https://api.instagram.com/v1/users/self/media/recent/?access_token=";
        requestUri = requestUri + access_token; 
        const images = await axios.get(requestUri);
        res.render('index', {images: images.data['data']});
    } catch (error) {
        next(error);
    }
});

app.listen(process.env.PORT || 3000, function() {
   
});