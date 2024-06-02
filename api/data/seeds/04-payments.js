/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('payments').del();
  await knex('payments').insert([
    {
      bookingId: 1,
      amount: 500.0,
      status: 'completed',
      paymentMethod: 'ZAAD',
      transactionId: 'ZAAD-1234',
      paidAt: new Date(),
    },
    {
      bookingId: 2,
      amount: 500.0,
      status: 'completed',
      paymentMethod: 'ZAAD',
      transactionId: 'ZAAD-1264',
      paidAt: new Date(),
    },
  ]);
};
