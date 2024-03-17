import Pokemon from '../models/PokemonModel.js';
import fs from 'fs';
import path from 'path';

export const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPokemonById = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await Pokemon.findByPk(id);
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).json({ error: 'Pokemon not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createPokemon = async (req, res) => {
  const {
    name,
    status,
    skill,
    height,
    width,
    length,
    hp,
    damage,
  } = req.body;

  try {
    const imagePath = req.file ? req.file.path : null;

    const newPokemon = await Pokemon.create({
      name,
      status,
      skill,
      height,
      width,
      length,
      hp,
      damage,
      image: req.file ? req.file.filename : null, // Simpan hanya nama file di database
    });

    res.status(201).json(newPokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePokemon = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    status,
    skill,
    height,
    width,
    length,
    hp,
    damage,
    image,
  } = req.body;
  try {
    const pokemon = await Pokemon.findByPk(id);
    if (pokemon) {
      await pokemon.update({
        name,
        status,
        skill,
        height,
        width,
        length,
        hp,
        damage,
        image,
      });
      res.json(pokemon);
    } else {
      res.status(404).json({ error: 'Pokemon not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePokemon = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPokemon = await Pokemon.destroy({ where: { id } });
    if (deletedPokemon) {
      res.json({ message: 'Pokemon deleted successfully' });
    } else {
      res.status(404).json({ error: 'Pokemon not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUploadedFile = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(process.cwd(), 'uploads', filename);
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(err);
        res.status(404).json({ error: 'File not found' });
        return;
      }
  
      const contentType = getContentType(filePath);
      res.setHeader('Content-Type', contentType);
  
      res.setHeader('Content-Disposition', 'inline; filename="' + filename + '"');
  
      res.sendFile(filePath);
    });
  };
  
  const getContentType = (filePath) => {
    const extname = path.extname(filePath);
    switch (extname.toLowerCase()) {
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      case '.gif':
        return 'image/gif';
      default:
        return 'application/octet-stream'; 
    }
  };
  