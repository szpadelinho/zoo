import * as AnimalService from "../services/AnimalService.js";

export const getAllAnimals = async (req, res) => {
    try {
        const animals = await AnimalService.getAllAnimals()
        res.json(animals)
    }
    catch (err) {
        res.status(500).json({error: "Failed to fetch animals from animalController.js (getAllAnimals function): " + err.message})
    }
}

export const getAnimalById = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const animal = await AnimalService.getAnimalById(id)
        res.json(animal)
    }
    catch (err) {
        res.status(500).json({error: "Failed to fetch animals from animalController.js (getAnimalById function): " + err.message})
    }
}

export const getEndangeredAnimals = async (req, res) => {
    console.log("Loading endangeredAnimals from animalController.js")
    try{
        const animals = await AnimalService.getEndangeredAnimals()
        res.json(animals)
    }
    catch (err) {
        res.status(500).json({error: "Failed to fetch animals from animalController.js (getEndangeredAnimals function): " + err.message})
    }
}

export const getAnimalsByHabitat = async (req, res) => {
    try{
        const habitat = req.params.habitat
        const animals = await AnimalService.getAnimalsByHabitat(habitat)
        res.json(animals)
    }
    catch (err) {
        res.status(500).json({error: "Failed to fetch animals from animalController.js (getAnimalsByHabitat function): " + err.message})
    }
}

export const getAnimalsBySpecies = async (req, res) => {
    try{
        const species = req.params.species
        const animals = await AnimalService.getAnimalsBySpecies(species)
        res.json(animals)
    }
    catch (err) {
        res.status(500).json({error: "Failed to fetch animals from animalController.js (getAnimalsBySpecies function): " + err.message})
    }
}

export const addAnimal = async (req, res) => {
    try{
        const animalData = req.body
        const newAnimal = await AnimalService.addAnimal(animalData)
        res.status(201).json(newAnimal)
    }
    catch (err) {
        res.status(500).json({error: "Failed to add animal from animalController.js (addAnimal): " + err.message})
    }
}

export const updateAnimal = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const animalData = req.body
        const updatedAnimal = await AnimalService.updateAnimal(id, animalData)
        if(!updatedAnimal) {
            res.status(404).json({error: "Failed to update animal from animalController.js (updateAnimal function)"})
        }
        res.json(updatedAnimal)
    }
    catch (err) {
        res.status(500).json({error: "Failed to update animal from animalController.js (updateAnimal function): " + err.message})
    }
}

export const deleteAnimal = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        const deleted = await AnimalService.deleteAnimal(id)
        if(!deleted) {
            res.status(404).json({error: "Failed to delete animal from animalController.js (deleteAnimal function)"})
        }
        res.status(204).json(deleted)
    }
    catch (err) {
        res.status(500).json({error: "Failed to delete animal from animalController.js (deleteAnimal function): " + err.message})
    }
}