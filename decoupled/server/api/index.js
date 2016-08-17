var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// serve API on express separately, and use angular for static front end with $http() to endpoints
// states instead of routes
// table names: users, file, file_users

router.get('/index', function(req, res, next){
  Promise.all([
    knex('file').select('*', 'file.id as file_id'),
    knex('users').join('file_users', 'file_id', 'file.id').select('users.id as users_id', 'users.first_name', 'users.last_name')
  ]).then(function(data){
      res.json({ data: data })
  })
})

// get full list

// get by id

router.get('index', function(req, res, next){
  knex('file_users').select().then(function(data){

  })
})

router.post('index', function(req, res, next){
  knex('file_users').select().then(function(data){

  })
})

module.exports = router;
