import express from 'express'
const AnimalController = require('./controllers/AnimalController')

const app = express()

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Serwer prawidłowo działa.")
})

app.get("/animals", AnimalController.getAllAnimals)
app.get("/animals/:id", AnimalController.getAnimalById)
app.get("/animals/endangered", AnimalController.getEndangeredAnimals)
app.get("/animals/:habitat", AnimalController.getAnimalsByHabitat)
app.get("/animals/:species", AnimalController.getAnimalsBySpecies)
app.post("/animals", AnimalController.addAnimal)
app.put("/animals/:id", AnimalController.updateAnimal)
app.delete("/animals/:id", AnimalController.deleteAnimal)

app.listen(port, () => {
    console.log("Server is on port " + port)
})