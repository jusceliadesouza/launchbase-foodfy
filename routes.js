const express = require('express')
const routes = express.Router()

const recipes = require('./controllers/recipes')
//const chefs = require('./controllers/chefs')
//const users = require('./controllers/users')

//data.json
const data = require('./data.json')

//principal
/*routes.get('/', recipes.index)
routes.put('/about', recipes.about)
routes.get('/admin/recipes/', recipes.table)
routes.get('/admin/recipes/:id', recipes.show)*/

routes.get('/', function(req, res) {
    return res.render('index', { recipes: data.recipes })
})

routes.get('/about', function(req, res) {
    return res.render('about')
})

routes.get('/recipes', function(req, res) {
    return res.render('recipes', { recipes: data.recipes })
})

routes.get('/recipes/:index', function(req, res) {
    const recipeIndex = req.params.index
    const recipe = data.recipes[recipeIndex]

    return res.render('recipe',  { recipe });
});

//admin

//recipes
routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)
routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)

//chefs
/*routes.get('/admin/chefs', chefs.index)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)
routes.post('/admin/chefs', chefs.post)
routes.put('/admin/chefs', chefs.put)
routes.delete('/admin/chefs', chefs.delete)*/

//users
/*routes.get('/admin/users', users.index)
routes.get('/admin/users/create', users.create)
routes.get('/admin/users/:id', users.show)
routes.get('/admin/users/:id/edit', users.edit)
routes.post('/admin/users', users.post)
routes.put('/admin/users', users.put)
routes.delete('/admin/users', users.delete)*/

module.exports = routes;