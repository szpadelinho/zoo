const fs = require('fs/promises')
const path = require('path')
const filePath = path.join(__dirname, "../data.zoo.json")

async function loadData(){
    try{
        const data = await fs.readFile(filePath, 'utf8')
        return JSON.parse(data)
    }
    catch(err){
        throw new Error("Failed to load data: " + err)
    }
}

async function saveData(animals){
    try{
        await fs.writeFile(filePath, JSON.stringify(animals, null, 2), 'utf8')
    }
    catch(err){
        throw new Error("Failed to save data: " + err)
    }
}

exports.getAllAnimals = async () => {
    return await loadData()
}

exports.getAnimalById = async (id) => {
    const animals = await loadData()
    return animals.find((animal) => animal.id === id)
}

exports.getEndangeredAnimals = async () => {
    try{
        const animals = await loadData()
        return animals.filter(animal => animal.isEndangered)
    }
    catch(err){
        throw new Error("Failed to load data: " + err)
    }
}
exports.getAnimalsByHabitat = async (habitat) => {
    try{
        const animals = await loadData()
        return animals.filter(animal => animal.habitat.toLowerCase() === habitat)
    }
    catch(err){
        throw new Error("Failed to load data: " + err)
    }
}

exports.getAnimalsBySpecies = async (species) => {
    const animals = await loadData()
    return animals.filter(animal => animal.species.toLowerCase() === species)
}

exports.addAnimal = async (animal) => {
    const animals = await loadData()
    const newAnimal = {
        id: animals.length > 0 ? animals[animals.length - 1].id + 1 : 1,
        ...animal
    }
    animals.push(newAnimal)
    await saveData(animals)
    return newAnimal
}

exports.updateAnimal = async (id, animal) => {
    const animals = await loadData()
    const index = animals.findIndex(animal => animal.id === id)

    if(index < 0) throw new Error ("Animal does not exist")

    animals[index] = {...animals[index], ...animal}
    await saveData(animals)
    return animals[index]
}

exports.deleteAnimal = async (id) => {
    const animals = await loadData()
    const index = animals.findIndex(animal => animal.id === id)

    if(index < 0) throw new Error ("Animal does not exist")

    animals.splice(index, 1)
    await saveData(animals)
    return true;
}