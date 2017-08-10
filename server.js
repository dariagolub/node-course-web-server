const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//middleware. when call next - app continue to run
app.use((req, res, next) => {
    var now = new Date().toString();
    let log = `${now} ${req.url} ${req.method}`;
    console.log(log);
    fs.appendFile('server.log', log, (err) => {
        console.log('Unable to append to server.log');
    });
    next();
});

app.use((req, res, next) => {
    res.render('maitenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//handler for http get request
app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Hey you'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About page',
    });
});

//bind application to the port
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});