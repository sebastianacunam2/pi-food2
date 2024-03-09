const { getAllRecipes } = require('../controllers/apiInfo')

const recipes = async (req, res) => {
    const { name } = req.query
    
    try {
    const allRecipes = await getAllRecipes();
        if (!name) res.send (allRecipes)
        else {
            let recipeName = await allRecipes.filter( r => r.name.toLowerCase().includes(name.toLowerCase()))
            console.log(recipeName, "toy akaa")
            
            if(!recipeName.length) {
                res.sendStatus(404)
            }else {
                res.send (recipeName)
            }
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    recipes
}