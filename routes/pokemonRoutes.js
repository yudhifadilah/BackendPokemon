import express from 'express';
import multer from '../config/MutlerConfig.js'; 
import * as PokemonController from '../controllers/PokemonController.js';

const router = express.Router();

router.get('/pokemons', PokemonController.getAllPokemons);
router.get('/pokemons/:id', PokemonController.getPokemonById);

router.post('/pokemons', (req, res, next) => {
  multer(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      next();
    }
  });
}, PokemonController.createPokemon);

router.put('/pokemons/:id', PokemonController.updatePokemon);
router.delete('/pokemons/:id', PokemonController.deletePokemon);

// Endpoint to fetch uploaded file
router.get('/uploads/:filename', PokemonController.getUploadedFile);

export default router;
