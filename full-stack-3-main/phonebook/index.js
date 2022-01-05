const express = require('express');
const app = express();
const morgan = require('morgan');
//const cors = require('cors');

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

// app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)    
  ].join(' ')
}));



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

app.get('/', (request, response) => {
  response.send('<h1>Hello Phonebook!</h1>');
})

app.get('/api/persons', (request, response) => {
  response.json(persons);
})
app.get('/api/persons/:id', (request, response) => {
  let id = parseInt(request.params.id, 10);
  let person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
    console.log(person);
  } else {
    response.sendStatus(404).end()
    console.log('404 error')
  }
})

app.get('/info', (request, response) => {
  let infoPage = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  response.send(infoPage)
})

app.delete('/api/persons/:id', (request, response) => {
  let id = parseInt(request.params.id, 10);
  let person = persons.find(person => person.id === id);

  if (person) {
    persons = persons.filter(person => person.id !== id);
    response.sendStatus(204);
    console.log(`${person.name} deleted`);
    console.log(persons);
  } else {
    response.sendStatus(404);
    console.log('Delete failed');
  }
})

const generateId = () => {
  const maxId = Math.max(...persons.map(person => person.id));
  
  return maxId + 1;
}

app.post('/api/persons', (request, response) => {
  const body = request.body;
  console.log('Post request received');
  
  if (body.name && body.number) {
    if (persons.find(person => person.name === body.name)) {
      console.log(`${body.name} already exists`)
      return response.status(403).json({
        error: 'person already exists'
      })
    }
    const newPerson = {
      id: generateId(),
      name: body.name,
      number: body.number
    }
    console.log(newPerson);
    persons = persons.concat(newPerson);
    return response.json(newPerson)
  } else if (!body.number) {
    console.log('Missing number');
    return response.status(400).json({
      error: 'missing number'
    })
  }
})

const unknownEndPoint = (request, response) => {
  response.status(404).send({error: 'unkown endpoint'})
}
app.use(unknownEndPoint)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})