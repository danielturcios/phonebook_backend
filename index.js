const express = require('express')
const app = express()

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

// client requesting an initial landing page
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// client requesting to view enitre phonebook data
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// client requesting to view phonebook info
app.get('/api/info', (request, response) => {
    const datetime = Date().toString()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${datetime}</p>`
        )
})

// client requesting to view specific entry in phonebook
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})