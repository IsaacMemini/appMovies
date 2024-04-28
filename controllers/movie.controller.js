const db = require("../models");
const Movie = db.Movies;

// Create and Save a new movie
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.synopsis || !req.body.released) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Movie
  const movie = new Movie({
    title: req.body.title,
    released: req.body.released,
    synopsis: req.body.synopsis,
  });

  // Save movie in the database
    movie
    .save(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student.",
      });
    });
};

// Find a movie Student with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found movie with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving movie with id=" + id });
    });
};

// Retrieve all movies from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  Movie.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving movies.",
      });
    });
};

//update a movie with the specified id in the request
exports.update = (req, res) => {
  const { id } = req.params;
  const { title, released, synopsis } = req.body;

  Movie.findByIdAndUpdate(id, { title,course, registered}, { new: true })
    .then(movie => {
      if (!movie) {
        return res.status(404).send('movie not found');
      }
      res.send(movie);
    })
    .catch(err => res.status(500).send('Error updating movie'));
};

// Delete a movie with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Movie.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete movie with id=${id}. Maybe movie was not found!`,
        });
      } else {
        res.send({
          message: "movie was deleted successfully!",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete movie with id=" + id,
      });
    });
};

// Delete all movies from the database.
exports.deleteAll = (req, res) => {
  Movie.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} movies were deleted successfully!`,
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all movies.",
      });
    });

};
