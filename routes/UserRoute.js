import express from "express";
import {
    getPokemon, 
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon
} from "../controllers/PokemonController.js";

const router = express.Router();

router.get('/pokemon', getPokemon);
router.get('/pokemon/:id', getPokemonById);
router.post('/pokemon', createPokemon);
router.patch('/pokemon/:id', updatePokemon);
router.delete('/pokemon/:id', deletePokemon);

export default router;