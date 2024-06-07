// Importing my dependencies
require('dotenv').config()
const express = require("express")
const {sequelize} = require("./models")
const genresController = require('./controllers/genresController')
const actorsController = require('./controllers/actorsController')
const moviesController = require("./controllers/moviesController")
const validate = require('./middlewares/schemaValidator')
const {movieSchema} = require('./schemas/movieSchemas')
const {loginSchema, signupSchema} = require('./schemas/auth')
const {signup, login} = require('./controllers/authController')
const authenticate = require("./middlewares/auth")
const { genreSchema } = require("./schemas/genreSchema")
const { actorSchema } = require("./schemas/actorSchema")
const cors = require('cors')

// create an express app

const app = express()

const port =3030

//test database connection
sequelize.authenticate()
  .then(() => console.log("Database connected ........"))
  .catch(err => console.log("Error: "+err))

//set up cors
app.use(cors({
  methods:"GET,POST",
  allowedHeaders:"Content-Type,Authorization",
  origin:'*'
}))

// Middleware  for json data
app.use(express.json())

// Define the routes
app.post('/genre',authenticate,validate(genreSchema), genresController.createGenre)
app.get("/genre",authenticate, genresController.getAllGenres)
app.get("/genre/:id",authenticate, genresController.getGenreById)
app.post('/actors',authenticate,validate(actorSchema), actorsController.createActor);
app.get('/actors',authenticate, actorsController.getAllActors);
app.get('/actors/:id',authenticate, actorsController.getActorById);
app.post('/movies' ,authenticate,validate(movieSchema), moviesController.createMovie)
app.get('/movies',authenticate, moviesController.getAllMovies)
app.post('/login',validate(loginSchema), login)
app.post('/signup',validate(signupSchema), signup)







// Set up server listener
app.listen(port, ()=>{
    console.log(`server is listening on port: ${port}`)
})


