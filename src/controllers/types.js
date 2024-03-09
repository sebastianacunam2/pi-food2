const { Diet } = require('../db')
const { API_KEY } = process.env
const axios = require('axios')

const types = async (req, res) => {
    try {
        
        const allDiets = await Diet.findAll();
        if(allDiets.length) {
            res.json(allDiets)
            //ojo acá con lo que llega luego al estado de dietas en el frontend!!!!

        } else {
            const apiCall = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
            const apiDiets = apiCall.data.results.map( ele => ele.diets )
            // console.log(apiDiets)

            const mixDiets = []

            apiDiets.forEach( ele => {
                // console.log(ele) ele me trae el array con los tipos de dietas en un string  
                ele.forEach( d => {
                    // console.log(d)  d me trae todas las dietas como un string solamente, para luego ser pusheadas al array vacío mixDiets.
                    mixDiets.push(d)
                })
            })
 
            const diets = new Set(mixDiets)
            //acá estoy sacando de mixDiets, las dietas que se repitan para dejar solamente las que NO se repiten. 

            diets.forEach( typeOfDiet => {
                Diet.findOrCreate({
                    where:{
                        name: typeOfDiet
                    }
                })
            })

            const allDiets2 = await Diet.findAll();
            res.json(allDiets2)
        }
    } catch (error) {
        res.status(404).json({msg: `dietTypes esta entrando al error`, error: error})
    }
}

module.exports = {types}