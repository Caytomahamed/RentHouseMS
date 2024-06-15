const inboxController = require('../controllers/inboxController');
const express = require('express');

const router = express.Router();

router.get('/:tenantId', inboxController.getInboxByUserId);

router.get(
  '/:tenantId/notReading',
  inboxController.getInboxByUserIdNotReading,
);

router
  .route('/')
  .post(inboxController.createInbox)
  .delete(inboxController.deleteInbox);

module.exports = router;
