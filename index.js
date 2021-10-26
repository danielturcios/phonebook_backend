const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('body', function (req, res) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

// client requesting to delete a phonebook entry
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// client requesting to add a new entry to phonebook
const generateId = () => {
    // generates a random number between 1 and 100,000
    let min = 1
    let max = 100000
    
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min) + min)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    } 

    if (persons.find(person => person.name.toLowerCase() == body.name.toLowerCase())) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})