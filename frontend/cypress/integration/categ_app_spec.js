describe('Category app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'aaa',
      username: 'bbb',
      password: 'ccc'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3001')
  })

  it('Login from is shown', function() {
    cy.contains('Log in to Application')
  })

  describe('Login',function() {
    it('fails with wrong credentials', function() {
      cy.get('#username').type('sdfsf')
      cy.get('#password').type('qrwfgr')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('bbb')
      cy.get('#password').type('ccc')
      cy.get('#login-button').click()

      cy.contains('wrong credentials').should('not.exist')
      cy.contains('Logout').click()
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'bbb', password: 'ccc' })
      cy.createCategory({ name: 'title', description: 'description', stars:0 })
    })

    it('A category can be created', function() {
      cy.contains('New item').click()
      cy.get('#name').type('new name')
      cy.get('#description').type('description')
      cy.get('.btn-success').contains('Create').click()
      cy.contains('new name')
    })

    it('A category can be rated', function() {
      cy.contains('View').click()
      cy.contains('stars: 0')
      cy.rateCategory('title', 3)
      cy.contains('stars: 3')
    })

    it('A category can be deleted', function() {
      cy.contains('title')
      cy.contains('Delete category').click()
      cy.contains('title').should('not.exist')
    })
  })
})