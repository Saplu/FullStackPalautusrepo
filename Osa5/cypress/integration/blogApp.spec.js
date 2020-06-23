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

    describe('and there is a blog', function() {
      beforeEach(function() {
        cy.get('#newBlogButton').click()
        cy.get('#title').type('titteli')
        cy.get('#author').type('kumppani')
        cy.get('#url').type('www.fi')
        cy.get('#submit').click()

        // cy.get('#newBlogButton').click()
        // cy.get('#title').type('neito kaunokainen')
        // cy.get('#author').type('kaunis neito')
        // cy.get('#url').type('www.com')
        // cy.get('#submit').click()
      })

      it('A blog can be liked', function() {
        cy.get('#show').click()
        cy.get('#like').click()

        cy.contains('likes: 1')
      })

      it('A blog can be deleted', function() {
        cy.get('#show').click()
        cy.get('#delete').click()
        cy.get('html').should('not.contain', 'titteli')
          .and('not.contain', 'kumppani')

      })
    })
  })
})