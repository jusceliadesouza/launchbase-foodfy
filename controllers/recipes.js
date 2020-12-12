const fs = require('fs')
const data = require('../data-test.json')
const { date } = require('../utils')

exports.index = function(req, res) {
    return res.render('admin/recipes/index', { recipes: data.recipes })
}

exports.create = function(req, res) {
    return res.render('admin/recipes/create')
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    
    for (key of keys) {
        if (req.body[key] == "") 
            return res.send('Please, fill all fields')
    }
    
    let { image, title, author, ingredients, preparation, information } = req.body
    
    const created_at = Date.now()
    const id = Number(data.recipes.length)
    
    data.recipes.push({
        id,
        image,
        title,
        author,
        ingredients,
        preparation,
        information,
        created_at
    })

    
    fs.writeFile("data-test.json", JSON.stringify(data, null, 4), function(err){
        if (err) return res.send("Write file error")
        return res.redirect(`/admin/recipes/${id}` )
    })    
}

// delete
exports.delete = function (req, res) {
    const { id } = req.body

    const filteredRecipes = data.recipes.filter(function(recipe) {
        return recipe.id != id
    })

    data.recipes = filteredRecipes

    fs.writeFile('data-test.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write files error')
        return res.redirect('/admin/recipes')
    })
}

exports.edit = function(req, res) {
    const { id } = req.params
    
    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id
    })
    
    if (!foundRecipe) return res.send('recipe not found')

    const recipe = {
        ...foundRecipe,
        ingredients: foundRecipe.ingredients,
        preparation: foundRecipe.preparation,
        created_at: date(foundRecipe.created_at)
    }

    return res.render('admin/recipes/edit', { recipe })
}

exports.put = function(req, res) {
    const { id } = req.body

    let index = 0
    const foundRecipe = data.recipes.find(function(recipe, foundIndex) {
        if(id == recipe.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundRecipe) return res.render('not-found')

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id)
    }

    data.recipes[index] = recipe

    fs.writeFile('data-test.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write error!')
        return res.redirect(`/admin/recipes/${id}`)
    })
}

exports.show = function(req, res) {
    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe) {
        return recipe.id == id
    })
    
    if(!foundRecipe) return res.render('not-found')   

    const recipe = {
        ...foundRecipe,
         ingredients: Array.from(foundRecipe.ingredients),
         preparation: Array.from(foundRecipe.preparation),
         created_at: new Intl.DateTimeFormat('pt-BR').format(foundRecipe.created_at),
    }

    return res.render('admin/recipes/show', { recipe }) 
}