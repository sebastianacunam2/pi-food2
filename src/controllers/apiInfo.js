const axios = require ('axios')
const e = require('express')
const { Recipe, Diet } = require ('../db')
const { API_KEY } = process.env

const getRecipeAPI = async () => {
    const recipesApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const recipes = recipesApi.data.results.map(r =>{
        return {
            id: r.id,
            name: r.title,
            resume: r.summary,
            // rate: r.spoonacularScore,
            healthy: r.healthScore,
            instructions: r.analyzedInstructions.map( i => i.steps.map( s => s.step )),
            diets: r.diets.map( d => d),
            image: r.image,
        }
    });
    return recipes
}


// const getRecipesDb = async () => {
//     return await Recipe.findAll({
//         include: {
//             model: Diet,
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             }
//         }
//     })
// }

const getRecipesDbSecondTry = async () => {
    const dbInfo = await Recipe.findAll({include: Diet})
    const finalDbInfo = dbInfo.map( e => {
        const diets = []
        for (let i = 0; i < e.dataValues.diets ; i++){
            diets.push(e.dataValues.diets[i].dataValues.name)
        }
        return {
            id: e.dataValues.id,
            name: e.dataValues.name,
            resume: e.dataValues.resume,
            // rate: e.dataValues.rate,
            healthy: e.dataValues.healthy,
            instructions: e.dataValues.instructions,
            image: e.dataValues.image,
            diets: diets
        }
    })
    // console.log(dbInfo)
    return finalDbInfo
    // console.log(dbInfo) --> dbInfo tiene como propiedad dataValues, propiedad a la cual tengo que acceder
}
//---------------------------------------------------------------

const getAllRecipes = async () => {
    const apiInfo = await getRecipeAPI();
    const dbInfo = await getRecipesDbSecondTry();

    const allRecipes = apiInfo.concat(dbInfo);
    return allRecipes;
}

module.exports = {
    getRecipeAPI, 
    getRecipesDbSecondTry,
    // getRecipesDb, 
    getAllRecipes
}