import express from 'express'
import * as AnimalController from './controllers/AnimalController.js'

const app = express()

const port = process.env.PORT || 3000

app.use(express.json());

app.get("/animals", AnimalController.getAllAnimals)
app.get("/animals/select/:id", AnimalController.getAnimalById)
app.get("/animals/endangered", AnimalController.getEndangeredAnimals)
app.get("/animals/habitat/:habitat", AnimalController.getAnimalsByHabitat)
app.get("/animals/species/:species", AnimalController.getAnimalsBySpecies)
app.post("/animals", AnimalController.addAnimal)
app.put("/animals/:id", AnimalController.updateAnimal)
app.delete("/animals/:id", AnimalController.deleteAnimal)

app.listen(port, () => {
    console.log("Server is on port " + port)
})