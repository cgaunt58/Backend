const express = require('express')
const router = express.Router() 

 
router.get('/', (req, res) => {
    res.render('index', {movies: movies})
})


router.get('/add-movie', (req, res) => {
    res.render('add-movie')
})

router.get('/movie-details', (req, res) => {
    res.render('movie-details', {movies: movies})
})

router.post('/create-movie', (req, res) => {
    const movieGenre = req.body.movieGenre
    const posterUrl = req.body.posterUrl
    const movieDescription = req.body.movieDescription
    const movieName = req.body.movieName 
    const movie = { title: movieName, description: movieDescription, genre: movieGenre, poster: posterUrl, movieId: movies.length + 1}
    movies.push(movie)
    res.redirect('/movies')
    
})






router.post('/delete-movie', (req, res) => {

    const movieId = req.body.movieId
    movies = movies.filter(movie => movie.movieId != movieId)
    res.redirect('/movies')
})





module.exports = router 