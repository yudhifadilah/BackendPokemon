import express from 'express';
import pokemonRoutes from './routes/pokemonRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
