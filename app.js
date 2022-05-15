const express = require('express');

const app = express();
const PORT = 3000;

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {});
});

app.get('/ui', (req, res) => {
    res.render('ui', {});
});

app.get('/profile', (req, res) => {
    res.render('profile', {});
});

app.get('/forgot', (req, res) => {
    res.render('forgot', {});
});

app.get('/login', (req, res) => {
    res.render('login', {});
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});