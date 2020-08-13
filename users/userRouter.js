const express = require('express');
const users = require('./userDb')
const posts = require('../posts/postDb')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  const user = { id: req.params.id, ...req.body }

  if (!req.body.name) {
    res.status(404).json({message:"Name required"})
  }

  users
    .insert(user)
    .then((data) => {
      if (data) {
        res.status(201).json({data})
      } else {
        res.status(404).json({message:"error"})
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({error: "Oops"})
    })
});

router.post('/:id/posts',  (req, res) => {
  const body = req.body
  body.user_id = req.params.id
  posts.insert(body)
    .then(post => {
      res.status(201).json({ post })
    })
    .catch(err => {
      res.status(400).json({ message: 'something went wrong!' })
    })
})


router.get('/', (req, res) => {
  users
    .get()
    .then((users) =>{
      res.status(200).json(users)
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({error:"oops"})
    })
});

router.get('/:id', validateUserId, (req, res, next) => {
  users
   .getById(req.params.id)
   .then((user) => {
       res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
   })


router.get('/:id/posts', validateUserId, (req, res, next) => {
  users
   .getUserPosts(req.params.id)
   .then(posts => {
    res.status(200).json(posts)
   })
   .catch((error) => {
     next(error)
   })
});

router.delete('/:id', validateUserId, (req, res, next) => {
  users
  .remove(req.params.id)
  .then((count) => {
    if (count > 0){
      res.status(200).json({message:"user deleted"})
    } else {
      res.status(404).json({message:"User with said ID not found"})
    }
  })
  .catch((error) => {
    next(error)
  })
});

router.put('/:id', validateUser, (req, res, next) => {
  users
  .update(req.params.id, req.body)
  .then(user =>{
    res.status(200).json({message:"user updated"})
  })
  .catch((error) => {
    next(error)
  })
});

//custom middleware

function validateUserId(req, res, next) {
  users.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(400).json({ error: "Invalid User ID." })
      }
    })
    .catch((error) => {
      next(error)
    })
}

function validateUser(req, res, next) {
  if (Object.keys(req.body).length !== 0) {
    req.body.name
      ? next()
      : res.status(400).json({
        error: "missing required name field"
      })
  } else {
    res.status(400).json({
      error: "missing user data"
    })
  }
}

function validatePost(req, res, next) {
  if (Object.keys(req.body).length !== 0) {
    req.body.text
      ? next()
      : res.status(400).json({
        error: "Missing Required text field."
      })
  } else {
    res.status(400).json({
      error: "Missing post data"
    })
  }
}

module.exports = router;
