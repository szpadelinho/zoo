import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataDir = path.join(__dirname, '../data')
const filePath = path.join(dataDir, 'zoo.json')

async function loadData(){
    try{
        console.log("Loading data from " + filePath);
        const data = await fs.readFile(filePath, 'utf8')
        console.log(JSON.parse(data))
        return JSON.parse(data)
    }
    catch(err){
        throw new Error("Failed to load zoo.json: " + err.message)
    }
}

async function saveData(animals){
    try{
        await fs.writeFile(filePath, JSON.stringify(animals, null, 2), 'utf8')
    }
    catch(err){
        throw new Error("Failed to save data to zoo.json: " + err.message)
    }
}

export const getAllAnimals = async () => {
    return await loadData()
}

export const getAnimalById = async (id) => {
    try{
        const animals = await loadData()
        return animals.find((animal) => animal.id === id)
    }
    catch(err){
        throw new Error("Failed to load data in animalService.js (getAnimalById function): " + err.message)
    }
}

export const getEndangeredAnimals = async () => {
    console.log("Loading endangered animals from animalController.js")
    try{
        const animals = await loadData()
        console.log("Zwierzęta to: " + animals)
        return animals.filter((animal) => animal.isEndangered)
    }
    catch(err){
        throw new Error("Failed to load data in animalService.js (getEndangeredAnimals function): " + err.message)
    }
}

export const getAnimalsByHabitat = async (habitat) => {
    try{
        const animals = await loadData()
        return animals.filter(animal => animal.habitat.toLowerCase() === habitat.toLowerCase())
    }
    catch(err){
        throw new Error("Failed to load data in animalService.js (getAnimalsByHabitat function): " + err.message)
    }
}

export const getAnimalsBySpecies = async (species) => {
    try{
        const animals = await loadData()
        return animals.filter(animal => animal.species.toLowerCase() === species.toLowerCase())
    }
    catch(err){
        throw new Error("Failed to load data in animalService.js (getAnimalsBySpecies function): " + err.message)
    }
}

export const addAnimal = async (animal) => {
    const animals = await loadData()
    const newAnimal = {
        id: animals.length > 0 ? animals[animals.length - 1].id + 1 : 1,
        ...animal
    }
    animals.push(newAnimal)
    await saveData(animals)
    return newAnimal
}

export const updateAnimal = async (id, animal) => {
    const animals = await loadData()
    const index = animals.findIndex(animal => animal.id === id)

    if(index < 0) throw new Error ("Animal does not exist")

    animals[index] = {...animals[index], ...animal}
    await saveData(animals)
    return animals[index]
}

export const deleteAnimal = async (id) => {
    const animals = await loadData()
    const index = animals.findIndex(animal => animal.id === id)

    if(index < 0) throw new Error ("Animal does not exist")

    animals.splice(index, 1)
    await saveData(animals)
    return true;
}