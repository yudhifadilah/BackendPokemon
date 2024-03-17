import express from 'express';
import multer from 'multer';
import * as PokemonController from '../controllers/PokemonController.js';
import { createPokemon, getUploadedFile } from '../controllers/PokemonController.js';


const router = express.Router();

router.get('/pokemons', PokemonController.getAllPokemons);
router.get('/pokemons/:id', PokemonController.getPokemonById);
router.post('/pokemons', upload.single('image'), createPokemon);
router.put('/pokemons/:id', PokemonController.updatePokemon);
router.delete('/pokemons/:id', PokemonController.deletePokemon);
// Endpoint untuk mengambil file gambar
router.get('/uploads/:filename', getUploadedFile);


export default router;
