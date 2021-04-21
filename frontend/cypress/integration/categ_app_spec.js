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
    cy.contains('Log in to application')
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
      cy.contains('logout').click()
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'bbb', password: 'ccc' })
      cy.createCategory({ title: 'title', author:'author', url: 'url', likes:0 })
    })

    it('A category can be created', function() {
      cy.contains('new category').click()
      cy.get('#title').type('new title')
      cy.get('#author').type('new author')
      cy.get('#url').type('new url')
      cy.contains('create').click()
      cy.contains('new title')
    })

    it('A category can be liked', function() {
      cy.contains('view').click()
      cy.contains('likes: 0')
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    it('A category can be deleted', function() {
      cy.contains('title')
      cy.contains('delete').click()
      cy.contains('title').should('not.exist')
    })
  })
})