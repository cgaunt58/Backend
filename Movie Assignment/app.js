const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const moviesRouter = require('./routes/movies')
app.use(express.urlencoded())

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use('/movies', moviesRouter)
app.use('/', moviesRouter)
app.use(express.static('static'))

global.movies = [
    { title: 'The Avengers', description:'Superheros come together to form the Avengers to save New York from an alien invasion.', genre: 'Action', poster:'https://i.pinimg.com/originals/de/36/e0/de36e003118102c55f243dd08b49fbd6.png', movieId: 1 },
    { title: 'Shang-Chi', description:'Find out the incredible story of Shang-Chi, and his fight against his father to gain the power of the Ten Rings, and save humanity in the process', genre: 'Action', poster:'https://bloximages.chicago2.vip.townnews.com/utdailybeacon.com/content/tncms/assets/v3/editorial/e/9a/e9aba7b0-0cef-11ec-8b32-5782b07f65cd/61327c52eb431.image.png', movieId: 2 },
    { title: 'Mallrats', description:'Two friends both loose their girlfriends on the same day, so they decide to head to the local mall', genre: 'Comedy', poster:'https://tinyurl.com/mallratsposter', movieId: 3 },
   
]

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log('Server is running...')
})