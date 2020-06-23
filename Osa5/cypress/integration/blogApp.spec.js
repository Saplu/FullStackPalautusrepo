const { getByAltText } = require("@testing-library/react")

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Minä',
      username: 'Saplu',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Saplu')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Minä logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Saplu')
      cy.get('#password').type('salis')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Saplu')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function(){
      cy.get('#newBlogButton').click()
      cy.get('#title').type('Cypress')
      cy.get('#author').type('Puoliso')
      cy.get('#url').type('www.asd.com')
      cy.get('#submit').click()

      cy.contains('Cypress')
      cy.contains('Puoliso')
    })
  })
})