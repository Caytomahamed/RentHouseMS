const generateComment = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz ';
  let comment = '';
  while (comment.length < 200) {
    comment += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return comment + '.'.repeat(300 - comment.length); // Ensure the comment is exactly 300 characters long.
};

const tenantIds = [3, 5, 7, 8, 9, 10];
const propertyIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const reviews = [];

tenantIds.forEach(tenantId => {
  for (let i = 0; i < 5; i++) {
    reviews.push({
      propertyId: propertyIds[Math.floor(Math.random() * propertyIds.length)],
      tenantId: tenantId,
      rating: Math.floor(Math.random() * 5) + 1,
      comment: generateComment(),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('reviews').del();
  await knex('reviews').insert(reviews);
};
