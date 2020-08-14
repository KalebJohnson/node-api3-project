const express = require('express');
const posts = require('./postDb');
const router = express.Router();

router.get('/', (req, res, next) => {
  posts
    .get()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      next(error)
    })
});

router.get('/:id', (req, res, next) => {
  posts
    .getById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({message:"No post found with said ID"})
      }
    })
    .catch((error) => {
      next(error)
    })
});

router.delete('/:id', (req, res, next) => {
 posts
  .remove(req.params.id)
  .then((count) => {
    if (count > 0){
      res.status(200).json({message:"post deleted"})
    } else {
      res.status(404).json({message:"Post with said ID not found"})
    }
  })
  .catch((error) => {
    next(error)
  })
});

router.put('/:id', validatePostId, (req, res, next) => {
  if ( !req.body.text ) {
    return res.status(400).json({message:"Please provide text"})
  }

  posts
    .update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        res.status(200).json({
          message:"Post updated."
        })
      } else {
        res.status(404).json({
          message:"Post with said ID not found."
        })
      }
    })
    .catch((error) => {
      next(error)
    })
});

// custom middleware

function validatePostId(req, res, next) {
  posts
    .getById(req.params.id)
    .then(posts => {
      if (posts) {
        req.posts = posts
        next()
      } else {
        res.status(400).json({ error: "Invalid Post ID." })
      }
    })
    .catch((error) => {
      next(error)
    })
}

module.exports = router;
