


const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');  // importar CORS

app.use(cors());  // habilitar CORS para las rutas


export const videoList = fs.readdirSync("./media_scroll");

app.get('/video-list', (req, res) => {
  res.json(videoList);
});

app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));

console.log(videoList);

//  http://localhost:3000/video-list