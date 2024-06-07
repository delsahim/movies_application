const {Genre,Movie} = require("../models")

//create genre function

exports.createGenre = async(req, res) => {
    try {
        const{name} = req.body
        const genre = await Genre.create({name})
        res.status(201).json(genre)

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.getAllGenres = async(req, res) => {
    try{
        const genres = await Genre.findAll()
        res.status(200).json(genres)
    }catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.getGenreById = async(req, res) => {
    try{
        const genre = await Genre.findByPk(req.params.id)
        if (genre) {
        res.status(200).json(genre)
        } else {
        res.status(404).json({error:'Genre Not Found'})
        }

    }catch(error) {
        res.status(500).json({error:error.message})
    }
}