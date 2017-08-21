const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.json({
    firstName: 'Don',
    lastName: 'Smith'
  })
})

app.get('/users', (req, res) => {
  res.json([
    {
      firstName: 'Don',
      lastName: 'Smith'
    },
    {
      firstName: 'Emma',
      lastName: 'Single'
    }
  ])
})

app.listen(3000, () => {
  console.log('Listening')
})
