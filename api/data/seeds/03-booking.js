/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('booking').del();
  await knex('booking').insert([
    {
      id: 1,
      propertyId: 1,
      tenantId: 1,
      startDate: '2024-05-01',
      endDate: '2024-05-15',
      securityDeposit: 500.0,
    },
    {
      id: 2,
      propertyId: 2,
      tenantId: 3,
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      securityDeposit: 700.0,
    },
  ]);
};
