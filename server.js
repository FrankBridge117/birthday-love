const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.render('index', { nombreNovia: "Mi Niña" }); 
});

app.post('/juego-terminado', express.json(), (req, res) => {
    console.log("¡Tu novia ha abierto su sobre y está leyendo la cartita! ❤️");
    res.json({ status: 'success' });
});

app.listen(PORT, () => {
    console.log(`\n¡Servidor listo y corriendo con éxito!`);
    console.log(`Entra aquí para ver la magia: http://localhost:${PORT}\n`);
});