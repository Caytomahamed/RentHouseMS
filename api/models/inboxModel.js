const db = require('../data/dbConfig');

// find inbox by tenantId
exports.findInboxByUserId = async userId => {
  const inboxMessages = await db('inbox as i')
    .where('receiverId', userId)
    .orWhere('senderId', userId);

  // Extract the IDs of messages that need to be marked as read
  const messageIds = inboxMessages
    .filter(message => message.receiverId === +userId && !message.is_read)
    .map(message => message.id);

  // Update the is_read status for those messages
  if (messageIds.length > 0) {
    await db('inbox').whereIn('id', messageIds).update({ is_read: true });
  }

  // Get the updated inbox with sender and receiver details
  return await db('inbox as i')
    .join('users as sender', 'i.senderId', 'sender.id')
    .join('users as receiver', 'i.receiverId', 'receiver.id')
    .select(
      'i.id',
      'sender.firstName as senderFirstName',
      'sender.lastName as senderLastName',
      'sender.id as senderId',
      'receiver.firstName as receiverFirstName',
      'receiver.lastName as receiverLastName',
      'receiver.id as receiverId',
      'i.subject',
      'i.message',
      'i.FromOrTo',
      'i.is_read',
      'i.created_at',
    )
    .where('i.receiverId', userId)
    .orWhere('i.senderId', userId)
    .orderBy('i.created_at', 'desc');
};

// find by Id
exports.findById = async id => {
  return db('inbox ').where('id', id);
};
// create inbox
exports.create = async inbox => {
  const [id] = await db('inbox').insert(inbox);
  return this.findById(id);
};

// delete inbox
exports.deleteInbox = async id => {
  return await db('inbox').where('id', id).del();
};

exports.findInboxByUserIdNotReading = async tenantId => {
  const unreadCount = await db('inbox')
    .count('id as count')
    .where('receiverId', tenantId)
    .andWhere('is_read', false)
    .first();

  return unreadCount.count;
};
