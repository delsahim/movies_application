const { Actor, Movie } = require('../models');

exports.createActor = async (req, res) => {
  try {
    const { name, birthYear } = req.body;
    const actor = await Actor.create({ name, birthYear });
    res.status(201).json(actor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllActors = async (req, res) => {
  try {
    const actors = await Actor.findAll({
      include: [Movie]
    });
    res.status(200).json(actors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getActorById = async (req, res) => {
  try {
    const actor = await Actor.findByPk(req.params.id, {
      include: [Movie]
    });
    if (actor) {
      res.status(200).json(actor);
    } else {
      res.status(404).json({ error: 'Actor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};