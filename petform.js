// creiamo la classe Pet
class Pet {
  constructor(_petName, _ownerName, _species, _breed) {
    this.petName = _petName
    this.ownerName = _ownerName
    this.species = _species
    this.breed = _breed
  }

  hasTheSameOwner(otherPet) {
    return this.ownerName === otherPet.ownerName
    // torna true o false
    // versione lunga:
    // if(this.ownerName === otherPet.ownerName){
    //     return true
    // } else {
    //     return false
    // }
  }
}

// array dove salveremo i pets
const pets = []

// riferimento del form
const form = document.getElementById('petForm')

// riferimenti degli input
const petNameInput = document.getElementById('petName')
const ownerNameInput = document.getElementById('ownerName')
const speciesInput = document.getElementById('species')
const breedInput = document.getElementById('breed')

const generatePetList = function () {
  // recupero il riferimento alla lista (vuota)
  const list = document.querySelector('.list-group')
  // svuoto la lista in modo da partire pulito ogni volta
  list.innerHTML = ''
  // ciclo pets e genero un list-item per ogni pet
  pets.forEach((pet) => {
    list.innerHTML += `
        <li class="list-group-item ${
          pets.some(
            // confrontiamo l'ownerName di QUESTO pet (pet) con ogni altro ownerName,
            // facendo attenzione a _saltare_ noi stessi (altrimenti tornerebbe sempre true)
            (p) => p.petName !== pet.petName && p.ownerName === pet.ownerName
          )
            ? // se troviamo un match con un pet precedente, assegniamo una classe CSS
              // a entrambi ("same-owner") che li colorerà
              'same-owner'
            : ''
        }">
            ${pet.petName} - ${pet.species} ${pet.breed} - ${pet.ownerName}
        </li>
    `
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  // genero un Pet tramite la classe ogni volta che invio il form
  const justCreatedPet = new Pet(
    petNameInput.value, // petName
    ownerNameInput.value, // ownerName
    speciesInput.value, // species
    breedInput.value // breed
  )
  // pusho il Pet in un array
  pets.push(justCreatedPet)
  form.reset() // resetta il form come a pagina appena caricata

  // manipolo il DOM
  generatePetList()
})
