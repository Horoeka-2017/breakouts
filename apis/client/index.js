const request = require('superagent')

request
  .get('http://localhost:3000')
  .end((err, res) => {
    if (err) {
      return console.log(err)
    }
    console.log('first name:', res.body.firstName)
  })

request
  .get('http://localhost:3000/users')
  .end((err, res) => {
    if (err) {
      return console.log(err)
    }
    console.log('last name:', res.body[1].lastName)
    console.log('response string:', res.text)
  })
