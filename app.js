const express = require('express');
const app = express();
const port = 3000;

const axios = require('axios');

// Middleware to parse JSON bodies
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

//app.set('views','./views/siguiente.html')

app.get('/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name.toLowerCase();

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemonData = response.data;
        console.log(response.data.weight);
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${pokemonData.name.toUpperCase()}</title>
            <link rel="stylesheet" href="/css/estilo.css">
        </head>
        <body>
            <div>
                <h1>${pokemonData.name.toUpperCase()}</h1>
                <!-- <h1>pokemon</h1> -->
                <img style="width: 200px;height: 200px;" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <p style="font-weight: bold;" >Height: ${pokemonData.height}</p>
                <p>Weight: ${pokemonData.weight}</p>
                <p>Type: ${pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                <a href='/siguiente.html' onclick="localStorage.setItem('lastPokemon', '${pokemonData.name}')">SIGUIENTE</a>
            </div>
        </body>
        </html>
        `);
    } catch (error) {
        res.status(404).json({ error: 'Pokémon not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});