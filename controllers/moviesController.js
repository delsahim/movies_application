//importing files
const { Movie, Actor, Genre } = require('../models');

exports.createMovie = async (req, res) => {
  const { title, releaseYear, actors, genres } = req.body;
  try {
    const movie = await Movie.create({ title, releaseYear });

    if (actors && actors.length) {
      const actorInstances = await Actor.findAll({ where: { id: actors } });
      await movie.addActors(actorInstances);
    }

    if (genres && genres.length) {
      const genreInstances = await Genre.findAll({ where: { id: genres } });
      await movie.addGenres(genreInstances);
    }

    const createdMovie = await Movie.findByPk(movie.id, { include: [Actor, Genre] });
    res.status(201).json(createdMovie);
  } catch (error) {
    console.error('Error creating movie:', error);  
    res.status(500).json({ error: error.message });
  }
};


exports.getAllMovies = async (req, res) =>{
    try{
        const movies = await Movie.findAll({
            include:[Actor, Genre]
        })
        res.status(200).json(movies)
    } catch(error) {
    res.status(500).json({ error: error.message });

    }
}
