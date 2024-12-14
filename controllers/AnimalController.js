const AnimalService = require('../services/AnimalService')

exports.getAllAnimals = async (req, res) => {
    try {
        const animals = await AnimalService.getEndangeredAnimals()
        res.json(animals)
    }
    catch (err) {
        res.status(500).json({error: "Failed to fetch animals: " + err})
    }
}

exports.getAnimalById = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const animal = await AnimalService.getAnimalById(id)
        res.json(animal)
    }
    catch (err) {
        res.status(500).json({error: "Failed to fetch animals: " + err})
    }
}

exports.getEndangeredAnimals = async (req, res) => {
    try{
        const animals = await AnimalService.getEndangeredAnimals()
        res.json(animals)
    }
    catch (err) {
        res.status(500).json({error: "Failed to fetch animals: " + err})
    }
}

exports.getAnimalsByHabitat = async (req, res) => {
    try{
        const habitat = req.params.habitat
        const animals = await AnimalService.getAnimalsByHabitat(habitat)
        res.json(animals)
    }
    catch (err) {
        res.status(500).json({error: "Failed to fetch animals: " + err})
    }
}

exports.getAnimalsBySpecies = async (req, res) => {
    try{
        const species = req.params.species
        const animals = await AnimalService.getAnimalsBySpecies(species)
        res.json(animals)
    }
    catch (err) {
        res.status(500).json({error: "Failed to fetch animals: " + err})
    }
}

exports.addAnimal = async (req, res) => {
    try{
        const animalData = req.body
        const newAnimal = await AnimalService.addAnimal(animalData)
        res.status(201).json(newAnimal)
    }
    catch (err) {
        res.status(500).json({error: "Failed to add animal: " + err})
    }
}

exports.updateAnimal = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const animalData = req.body
        const updatedAnimal = await AnimalService.updateAnimal(id, animalData)
        if(!updatedAnimal) {
            res.status(404).json({error: "Failed to update animal: " + err})
        }
        res.json(updatedAnimal)
    }
    catch (err) {
        res.status(500).json({error: "Failed to update animal: " + err})
    }
}

exports.deleteAnimal = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const deleted = await AnimalService.deleteAnimal(id)
        if(!deleted) {
            res.status(404).json({error: "Failed to delete animal: " + err})
        }
        res.status(123).json(deleted)
    }
    catch (err) {
        res.status(500).json({error: "Failed to delete animal: " + err})
    }
}