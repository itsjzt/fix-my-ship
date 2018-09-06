const express = require('express');
const router = express.Router();
const passport = require('passport');
const { catchErrors } = require('../helper');

// Controllers
const userController = require('../controllers/user');
const PostController = require('../controllers/Post');
const commentController = require('../controllers/comment');

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

// Post
router.get('/addPost', PostController.addPostGet);
router.post(
  '/addNewPost',
  userController.ensureAuthenticated,
  catchErrors(PostController.addNewPost)
);
router.get('/post/:slug', catchErrors(PostController.viewPost));
router.get(
  '/post/:slug/delete',
  userController.ensureAuthenticated,
  catchErrors(PostController.ensureAuthorBySlug),
  catchErrors(PostController.deletePost)
);
router.get(
  '/post/:slug/update',
  userController.ensureAuthenticated,
  catchErrors(PostController.ensureAuthorBySlug),
  catchErrors(PostController.updateRequest)
);
router.post(
  '/post/:slug/update',
  userController.ensureAuthenticated,
  catchErrors(PostController.ensureAuthorBySlug),
  catchErrors(PostController.updatePost)
);

router.get(
  '/post/:slug/upvote',
  userController.ensureAuthenticated,
  catchErrors(PostController.upvote)
);

router.get(
  '/post/:slug/downvote',
  userController.ensureAuthenticated,
  catchErrors(PostController.downvote)
);

// Comment
router.post(
  '/comment/:id/add',
  userController.ensureAuthenticated,
  commentController.addComment
);
router.get(
  '/comment/:commentid/delete',
  userController.ensureAuthenticated,
  commentController.deleteComment
);

router.get(
  '/comment/:id/upvote',
  userController.ensureAuthenticated,
  catchErrors(commentController.upvote)
);

router.get(
  '/comment/:id/downvote',
  userController.ensureAuthenticated,
  catchErrors(commentController.downvote)
);

module.exports = router;
