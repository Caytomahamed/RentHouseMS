/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('booking').del();
  await knex('booking').insert([
    {
      id: 2,
      propertyId: 2,
      tenantId: 3,
      startDate: '2024-06-26',
      endDate: '2024-07-26',
    },
  ]);
};
