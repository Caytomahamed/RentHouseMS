/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('propertyTypes').del();
  await knex('propertyTypes').insert([
    { type: 'daar' },
    { type: 'bangalo' },
    { type: 'fooq' },
  ]);
  await knex('properties').del();
  await knex('properties').insert([
    {
      address: '123 Main St',
      city: 'Example City',
      state: 'Example State',
      propertyTypeId: 1,
      squareFootage: 2000,
      bedrooms: 3,
      bathrooms: 2,
      rentAmount: 1500,
      maplink: 'https://goo.gl/maps/1234',
      landLordId: 2,
      available: true,
      description: 'A beautiful house for rent',
      imageUrls: JSON.stringify([
        'file-1709407143356.jpg',
        'file-1709407143357.jpg',
        'file-1709407143355.jpg',
      ]),
    },
    {
      address: '456 Elm St',
      city: 'Another City',
      state: 'Another State',
      squareFootage: 1200,
      bedrooms: 2,
      bathrooms: 1,
      rentAmount: 1200,
      landLordId: 2,
      propertyTypeId: 1,
      maplink: 'https://goo.gl/maps/1234',
      available: true,
      description: 'Cozy apartment in a great location',
      imageUrls: JSON.stringify([
        'file-1709407143359.jpg',
        'file-1709407143358.jpg',
        'file-1709407143360.jpg',
      ]),
    },
  ]);
};
