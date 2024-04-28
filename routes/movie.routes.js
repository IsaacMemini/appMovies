module.exports = app => {
  const movies = require("../controllers/movie.controller.js");
  let router = require("express").Router();

  // Create a new movie
  router.post("/", movies.create);

  // Retrieve all movies
  router.get("/", movies.findAll);

  router.get("/:id", movies.findOne);

  // Retrieve all movies
  router.get("/", movies.findAll);
  //update a movie with id
  router.put("/:id", movies.update);
  // Delete a movie with id
  router.delete("/:id", movies.delete);

  // Delete all movies
  router.delete("/", movies.deleteAll);

  app.use("/api/movies", router);
};
