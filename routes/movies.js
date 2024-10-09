const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model'); 

// List all movies
router.get('/movies', (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('movies', { movies });
    })
    .catch(err => next(err));
});

// View movie details
router.get('/movies/:id', (req, res, next) => {
  const { id } = req.params;  // Extract ID from URL
  console.log('Fetching movie with ID:', id); 
  Movie.findById(id)          // Searching for the movie by ID
    .then(movie => {
      if (!movie) {
        return res.status(404).render('not-found'); // Render not found if movie doesn't exist
      }
      res.render('movieDetails', { movie }); // Render movie details
    })
    .catch(err => {
      console.error('Error finding movie:', err);
      next(err); 
    });
});

module.exports = router;
