const express = require('express')

express()
    .use(express.static('public'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => {
        res.render('pages/test', {
            title: 'Exercise 3 - stretch'
        })
    })
    .get('*', (req, res) => {
        res.status(404);
        res.send('Page not found')
    })
    .listen(4000, () => console.log('Listening to port 4000'))