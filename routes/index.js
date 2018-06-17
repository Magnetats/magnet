const express = require('express')

const router = express.Router()

const isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next()
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/')
}

/* GET Home Page */
router.get('/home', isAuthenticated, (req, res) => {
  res.redirect('/home', {
    user: req.user,
  })
})

module.exports = (passport) => {
  /* GET login page. */
  router.get('/', (req, res) => {
    // Display the Login page with any flash message, if any
    res.redirect('/', {
      message: req.flash('message'),
    })
  })
  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true,
  }))
  /* GET Registration Page */
  router.get('/signup', (req, res) => {
    res.redirect('/register', {
      message: req.flash('message'),
    })
  })

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true,
  }))
  // /* GET Home Page */
  // router.get('/home', isAuthenticated, (req, res) => {
  //   res.render('home', {
  //     user: req.user,
  //   })
  // })

  /* Handle Logout */
  router.get('/signout', (req, res) => {
    req.logout()
    res.redirect('/signin')
  })
  return router
}
