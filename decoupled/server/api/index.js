var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// serve API on express separately, and use angular for static front end with $http() to endpoints
// states instead of routes

router.get('/index', function(req, res, next){
  knex('file_users').select().then(function(data){
    res.json({data: data})
  })
})

router.get('/index/file', function(req, res, next){
    knex('users')
      .join('file_users', 'users_id', 'users.id')
      .join('file', 'file_id', 'file.id')
      .select('file.name', 'file.content', 'file.timestamp', 'users.id as users_id', 'users.first_name', 'users.last_name')
      .then(function(data){
      res.json({data: data
    })
  })
})

router.get('/index/users', function(req, res, next){
  knex('file')
    .join('file_users', 'file_id', 'file.id')
    .join('users', 'users_id', 'users.id')
    .select('file.name', 'file.content', 'file.timestamp', 'users.id as users_id', 'users.first_name', 'users.last_name')
    .then(function(data){
      res.json({data: data
    })
  })
})

router.get('/index/file/:id', function(req, res, next){
  Promise.all([
    knex('file')
      .select('*', 'file.id as file_id')
      .where({'file.id': req.params.id})
      .first(),
    knex('users')
      .join('file_users', 'users_id', 'users.id')
      .select('users.id as users_id', 'users.first_name', 'users.last_name')
      .where({file_id: req.params.id})
  ]).then(function(data){
    res.json({data: data})
  })
})

router.get('/index/users/:id', function(req, res, next) {
  Promise.all([
    knex('users')
      .select('*', 'users.id as users_id').where({'users.id': req.params.id}).first(),
    knex('file')
      .join('file_users','file_id','file.id')
      .select('file.id as file_id', 'file.name')
      .where({
      users_id: req.params.id})
  ]).then(function(data){
    res.json({data: data});
  })
})

// router.post('/index/users', function(req, res, next){
//   knex('users')
//     .insert(req.body)
//     .then(function(){
//       res.end();
//   })
// })
//
// router.post('/index/file', function(req, res, next){
//   knex('file')
//     .insert(req.body)
//     .then(function(){
//       res.end();
//   })
// })

module.exports = router;
