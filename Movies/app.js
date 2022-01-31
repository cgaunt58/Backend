const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const moviesRouter = require('./routes/movies')
const session = require('express-session')
app.use(express.urlencoded())

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use('/movies', moviesRouter)
app.use('/', moviesRouter)
app.use(express.static('static'))

const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 8080

io.on('connection', (socket) => {
    console.log('User is connected')

    socket.on('Cinema', (chat) => {
        console.log(chat)
        io.emit('Cinema', chat)
    })

})

app.use(express.static('public'))


app.get('/movies/chat', (req, res) => {
    res.render('chat')
})


global.movies = [
    { title: 'The Avengers', description:'Superheros come together to form the Avengers to save New York from an alien invasion.', genre: 'Action', poster:'https://i.pinimg.com/originals/de/36/e0/de36e003118102c55f243dd08b49fbd6.png', movieId: 1 },
    { title: 'Shang-Chi', description:'Find out the incredible story of Shang-Chi, and his fight against his father to gain the power of the Ten Rings, and save humanity in the process', genre: 'Action', poster:'https://bloximages.chicago2.vip.townnews.com/utdailybeacon.com/content/tncms/assets/v3/editorial/e/9a/e9aba7b0-0cef-11ec-8b32-5782b07f65cd/61327c52eb431.image.png', movieId: 2 },
    { title: 'Mallrats', description:'Two friends both loose their girlfriends on the same day, so they decide to head to the local mall', genre: 'Comedy', poster:'https://tinyurl.com/mallratsposter', movieId: 3},
]

global.users = [
    {username: 'ron.swanson', password: 'password', userId: 1},
    {username: 'cgaunt', password: 'football', userId: 2}
]

app.use(session({
    secret: 'THISSECRETKEY', 
    saveUninitialized: true, 
    resave: true 
}))

app.post('/create-user', (req, res) => {
    const username = req.body.username
    const password = req.body.password 
    const user = { username: username, password: password, userId: users.length + 1}
    users.push(user)
    res.redirect('/movies')
})



function authenticateMiddleware(req, res, next) {

    if(req.session) {
        if(req.session.username) {
            next() 
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
}

app.post('/login', (req, res) => {

    const username = req.body.username 
    const password = req.body.password 

    const persistedUser = users.find(user => {
        return user.username == username && user.password == password
    })

    if(persistedUser) {
        if(req.session) {
            req.session.username = persistedUser.username 
        }
        res.redirect('/movies/add-movie')
    } else {
        res.render('index', {errorMessage: 'Username or password is invalid!'})
    }
})




app.get('/movies/add-movie', authenticateMiddleware, (req, res) => {
    res.render('add-movie', {movies: movies})
})

app.get('/movies/movie-details', authenticateMiddleware, (req, res) => {
    res.render('movie-details', {movies: movies})
})

app.get('/registration', (req, res) => {
    res.render('registration')
})

app.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy();
    }
    res.redirect("/movies");
})

app.get('/', (req, res) => {
    res.render('index')
})

http.listen(PORT, () => {
    console.log(__dirname)
    console.log('Server is running...')
})