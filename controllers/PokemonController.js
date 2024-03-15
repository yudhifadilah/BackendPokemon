import Pokemon from "../models/PokemonModel.js";

export const getPokemon = async(req, res) =>{
    try {
        const response = await Pokemon.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPokemonById = async(req, res) =>{
    try {
        const response = await Pokemon.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createPokemon = async(req, res) =>{
    try {
        await Pokemon.create(req.body);
        res.status(201).json({msg: "Pokemon Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePokemon = async(req, res) =>{
    try {
        await Pokemon.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Pokemon Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePokemon = async(req, res) =>{
    try {
        await Pokemon.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Pokemon Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}