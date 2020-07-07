'use strict';

const express = require('express');
const morgan = require('morgan');

const { top50, electMostPopularArtist } = require('./data/top50');
const { books, groupByType } = require('./data/books');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

// endpoints here
app.get('/top50', (req, res) => {
    res.render('pages/top50', {
        title: 'Top 50 Songs Streamed on Spotify',
        data: top50
    });
})

app.get('/top50/popular-artist', (req, res) => {
    res.render('pages/top50', {
        title: 'Most Popular Artist',
        data: electMostPopularArtist(top50)
    })
})

app.get('/top50/song/:rank', (req, res) => {
    const { rank } = req.params;
    if (rank > 0 && rank < 50) {
        res.render('pages/song#', {
            title: `Song #${rank}`,
            data: top50[rank-1]
        });
    } else {
        res.status(404);
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        })
    }
    
})

//books
app.get('/books', (req, res) => {
    res.render('pages/books', {
        title: 'My Favorite Books',
        data: books,
        types: Object.keys(groupByType(books))
    })
})

app.get('/book/:id', (req, res) => {
    const { id } = req.params;
    res.render('pages/bookPage', {
        title: books[id-101].title,
        book: books[id-101]
    })
})

app.get('/books/:type', (req, res) => {
    const {type} = req.params;
    res.render('pages/books', {
        title: type,
        data: groupByType(books)[type],
        types: [type]
    });
})

// handle 404s
app.get('*', (req, res) => {
    res.status(404);
    res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
