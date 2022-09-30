let id = null

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3001')
  })
})

Cypress.Commands.add('createCategory', ({ name, description, stars }) => {
  cy.request({
    url: 'http://localhost:3001/api/categ',
    method: 'POST',
    body: { mainCateg: 'category', isMainCateg: true },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })

  cy.request({
    url: 'http://localhost:3001/api/categ',
    method: 'POST',
    body: { mainCateg: 'category', isMainCateg: false, name, description, stars },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })

  cy.visit('http://localhost:3001')
})

Cypress.Commands.add('rateCategory', ( name, stars ) => {
  cy.request({
    url: 'http://localhost:3001/api/categ',
    method: 'GET',
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  }).then((response => {
    const id = response.body[1].id
    cy.request({
      url: `http://localhost:3001/api/categ/${id}`,
      method: 'PUT',
      body: { mainCateg: 'category', isMainCateg: false, name: name, stars: stars },
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
      }
    })
  }))

  cy.visit('http://localhost:3001')
})