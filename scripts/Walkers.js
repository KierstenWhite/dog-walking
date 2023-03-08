import { Assignments } from "./Assignments.js"
import { getWalkers } from "./database.js"
import { getWalkerCities } from "./database.js"
import { getCities } from "./database.js"

const walkersArray = getWalkers()
const walkerCitiesArray = getWalkerCities()
const cities = getCities()

const filterWalkerCitiesByWalker = (walkerObject) => {
    let assingmentsArray = []
    for (const currentObject of walkerCitiesArray) {
        if(walkerObject.id === currentObject.walkerId){
            assingmentsArray.push(currentObject)
        }
    }
    return assingmentsArray 
}


const assignedCityNames = (assignments) => {
    let matchingCities = []
    for (const assignment of assignments) {
        for (const city of cities) {
            if(assignment.cityId === city.id){
                matchingCities.push(city.name)
            }
        }
    }
    return matchingCities 
}

document.addEventListener(
    "click", 
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("walker")) {
            const [, walkerId] = itemClicked.id.split("--")
            for (const singleWalker of walkersArray) {
                if (singleWalker.id === parseInt(walkerId)) {
                    const assignments = filterWalkerCitiesByWalker(singleWalker)
                    const cities = assignedCityNames(assignments)
                    window.alert(`${singleWalker.name} services ${cities}`)
                }
            }
        }
    }
)


export const Walkers = () => {
    let walkerHTML = "<ul>"
    for (const walker of walkersArray) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }
    walkerHTML += "</ul>"
    return walkerHTML
}