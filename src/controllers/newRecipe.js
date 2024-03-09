const { Recipe, Diet } = require('../db')

const newRecipe = async (req, res) => {
    try {  
        const { name, resume, /*rate,*/ healthy, instructions, image, createdInDB, diets } = req.body 
        
        const newRecipe = await Recipe.create({
            name, 
            resume, 
            // rate, 
            healthy, 
            instructions, 
            image, 
            createdInDB,
            //cuando haga el post en el json y en el front tengo que colocar los tipos de dietas posibles!!
            
        })
        // console.log("newRecipe ------ > ", newRecipe, "\n name, resume, rate, healthy, instructions, image, createdInDB", name, resume, rate, healthy, instructions, image, createdInDB)
        const dietDb = await Diet.findAll({
            where: {
                name: diets
            }
        })

        newRecipe.addDiet(dietDb)
        res.json("Receta creada con éxito!")  
    }    catch(error){
        console.log(error)
    }
}

module.exports = {newRecipe}