const inboxController = require('../controllers/inboxController');
const express = require('express');

const router = express.Router();

router.get('/:userId/notReading', inboxController.getInboxByUserIdNotReading);

router.get('/:userId/:all/users', inboxController.getInboxByUserId);

router
  .route('/')
  .post(inboxController.createInbox)
  .delete(inboxController.deleteInbox);

module.exports = router;
