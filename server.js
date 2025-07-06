const express = require("express");
const app = express();
require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.listen(
  process.env.PORT || 3001,
  console.log(
    "Servidor corriendo en: " + "http://localhost:" + process.env.PORT || 3001
  )
);

const crearCancion = async (req, res) => {
  const { id, titulo, artista, tono } = req.body;

  const newCancion = { id, titulo, artista, tono };
  let datos = await JSON.parse(fs.readFileSync("./repertorio.json"));

  datos.push(newCancion);

  fs.writeFileSync("./repertorio.json", JSON.stringify(datos));
  res.send("Canción agruegada con éxito!");
};
app.post("/canciones", crearCancion);

app.get("/canciones", (req, res) => {
  let datos = JSON.parse(fs.readFileSync("./repertorio.json"));
  res.json(datos);
});

app.put("/canciones/:id", (req, res) => {
  const cancionId = req.params.id;
  const { id, titulo, artista, tono } = req.body;

  let datos = JSON.parse(fs.readFileSync("./repertorio.json"));
  const index = datos.findIndex((p) => p.id == cancionId);
  datos[index] = { id, titulo, artista, tono };

  fs.writeFileSync("./repertorio.json", JSON.stringify(datos));
  res.send("Cancion " + cancionId + " fue modificada!");
});

app.delete("/canciones/:id", async (req, res) => {
  const { cancionId } = req.params;
  let datos = await JSON.parse(fs.readFileSync("./repertorio.json"));
  const index = datos.findIndex((p) => p.id == cancionId);
  datos.splice(index, 1);
  fs.writeFileSync("./repertorio.json", JSON.stringify(datos));
  res.send("Cancion " + cancionId + " fue eliminada!");
});
