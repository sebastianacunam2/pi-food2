const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { recipes } = require('../controllers/recipes');
const { recipeId } = require('../controllers/recipesId');
const { types } = require('../controllers/types');
const { newRecipe } = require('../controllers/newRecipe')




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//

router.get('/recipes', recipes)

router.get('/recipes/:id', recipeId)

router.get('/types', types)

router.post('/newRecipe', newRecipe)
    
module.exports = router;
