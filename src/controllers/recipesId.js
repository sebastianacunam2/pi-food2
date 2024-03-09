const { Recipe, Diet } = require('../db')
const { API_KEY } = process.env
const axios = require('axios')

const recipeId = async (req, res) => {
    const {id} = req.params
    let idRecipe 

    if(id.includes("-")){
        try {
            idRecipe = await Recipe.findOne({
                where:{id: id},
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            })
            res.json(idRecipe)
        } catch (error) {
            res.json("No existe tal receta")
        }        
    }else {
        try {
            const recipesApibyId = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
            const recipeId = recipesApibyId.data
            idRecipe = {
                id: recipeId.id,
                name: recipeId.title,
                resume: recipeId.summary,
                // rate: recipeId.spoonacularScore,
                healthy: recipeId.healthScore,
                instructions: recipeId.analyzedInstructions.map( i => i.steps.map( s => s.step )),
                diet: recipeId.diets,
                image: recipeId.image,
            }
            res.json(idRecipe)
        } catch (error) {
            res.json("No existe tal receta")
        }
        
    }
    // res.send(recipeId)
    // return res.send(recipeId) 
}

module.exports = {recipeId}