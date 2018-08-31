const express = require('express');
const router = express.Router();
const passport = require('passport');
const { catchErrors } = require('../helper');

// Controllers
const userController = require('../controllers/user');
const contactController = require('../controllers/contact');
const PostController = require('../controllers/Post');

router.get('/', catchErrors(PostController.viewAllPosts));
router.get('/contact', contactController.contactGet);
router.post('/contact', contactController.contactPost);
router.get(
  '/account',
  userController.ensureAuthenticated,
  userController.accountGet
);
router.put(
  '/account',
  userController.ensureAuthenticated,
  userController.accountPut
);
router.delete(
  '/account',
  userController.ensureAuthenticated,
  userController.accountDelete
);
router.get('/signup', userController.signupGet);
router.post('/signup', userController.signupPost);
router.get('/login', userController.loginGet);
router.post('/login', userController.loginPost);
router.get('/forgot', userController.forgotGet);
router.post('/forgot', userController.forgotPost);
router.get('/reset/:token', userController.resetGet);
router.post('/reset/:token', userController.resetPost);
router.get('/logout', userController.logout);
router.get(
  '/unlink/:provider',
  userController.ensureAuthenticated,
  userController.unlink
);
router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_location'] })
);
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: 'profile email' })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);
router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email profile repo'] })
);
router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

// Post routes  
router.get('/addPost', PostController.addPostGet);
router.post('/addNewPost', catchErrors(PostController.addNewPost));
router.get('/post/:slug', catchErrors(PostController.viewPost));
router.get('/post/:slug/delete', catchErrors(PostController.deletePost));
router.get('/post/:slug/update', catchErrors(PostController.updateRequest));
router.post('/post/:slug/update', catchErrors(PostController.updatePost));

router.post('/post/:slug/comment/add', userController.ensureAuthenticated)
router.get('/post/:slug/comment/delete', userController.ensureAuthenticated)

module.exports = router;
