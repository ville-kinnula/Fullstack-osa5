describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const user2 = {
      name: 'Ville Kinnula',
      username: 'vkinnul',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('login').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.contains('wrong username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })

  describe('when logged in',function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('login').click()

      cy.contains('new blog').click()

      cy.get('#title').type('new blog for testing')
      cy.get('#author').type('alfred myfriend')
      cy.get('#url').type('newblogs.com')
      cy.contains('create').click()
    })

    it('A blog can be created', function() {
      cy.get('.viewLessBlog').contains('new blog for testing')
    })

    it('blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.get('.viewMoreBlog').contains('Likes 1')
    })

    it('blog can removed', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('.viewLessBlog').should('not.contain', 'new blog for testing')
    })

    it('cant remove blogs from other users', function() {
      cy.contains('logout').click()

      cy.get('#username').type('vkinnul')
      cy.get('#password').type('salainen')
      cy.contains('login').click()

      cy.contains('view').click()
      cy.get('.removeButton').should('have.css', 'display', 'none')

    })

    it.only('blogs are sorted by amount of like', function() {
      cy.get('#title').type('second new blog with most Likes')
      cy.get('#author').type('alfred myfriends friend')
      cy.get('#url').type('newerblogs.com')
      cy.contains('create').click()

      cy.get('#title').type('third new blog with least Likes')
      cy.get('#author').type('alfred myfriends friends friend')
      cy.get('#url').type('newestblogs.com')
      cy.contains('create').click()

      cy.get('#title').type('giving 3rd blog time to load')
      cy.get('.viewLessBlog').then( blogs => {
        cy.wrap(blogs[0]).contains('view').click()
        cy.wrap(blogs[1]).contains('view').click()
        cy.wrap(blogs[2]).contains('view').click()
      })

      cy.get('.viewMoreBlog').then( blogs => {
        cy.wrap(blogs[0]).contains('like').click()
        cy.wrap(blogs[1]).contains('like').click()
        cy.wrap(blogs[1]).contains('like').click()
      })

      cy.get('#author').type('giving likes time to load')

      cy.get('.viewMoreBlog').then( blogs => {
        cy.wrap(blogs[0]).should('contain', 'Likes 2')
        cy.wrap(blogs[1]).should('contain', 'Likes 1')
        cy.wrap(blogs[2]).should('contain', 'Likes 0')
      })
    })
  })
})
