exports.up = function (knex) {
  return knex.schema
    .createTable('roles', function (table) {
      table.increments('id').primary().notNullable();
      table.string('name', 50).notNullable();
    })
    .createTable('users', function (table) {
      table.increments('id').primary().notNullable();
      table.string('firstname', 255).notNullable();
      table.string('lastname', 255).notNullable();
      table.string('email', 255).notNullable();
      table.string('password', 255).notNullable();
      table.string('state', 255).notNullable();
      table.string('city', 255).notNullable();
      table.string('address', 255).notNullable();
      table.string('birthday', 255).notNullable();
      table.integer('phone').notNullable();
      table.string('imageUrl', 255);
      table.string('passwordResetToken');
      table.string('passwordResetExpires');
      table.integer('roleId').unsigned().notNullable();
      table
        .foreign('roleId')
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.boolean('isActive').defaultTo(true).notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .createTable('propertyTypes', function (table) {
      table.increments('id').primary().notNullable();
      table.string('type', 50).notNullable();
    })
    .createTable('properties', function (table) {
      table.increments('id').primary(); // Creates an auto-incrementing ID as the primary key
      table.string('address', 255).notNullable();
      table.string('city', 100).notNullable();
      table.string('state', 50).notNullable();
      table.string('maplink', 50).notNullable();
      table.integer('squareFootage');
      table.integer('bedrooms');
      table.integer('bathrooms');
      table.decimal('rentAmount').notNullable();
      table.boolean('available').notNullable().defaultTo(true); // true if the property is available for rent
      table.text('description');
      table.integer('landLordId').notNullable();
      table
        .foreign('landLordId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('propertyTypeId').notNullable();
      table
        .foreign('propertyTypeId')
        .references('id')
        .inTable('propertyTypes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.specificType('imageUrls', 'text[]'); // Array of image URLs
    })
    .createTable('booking', function (table) {
      table.increments('id').primary();
      table.integer('propertyId').notNullable();
      table.foreign('propertyId').references('id').on('properties');
      table.integer('tenantId').notNullable();
      table.foreign('tenantId').references('id').on('users');
      table.date('startDate').notNullable();
      table.date('endDate').notNullable();
      table.decimal('securityDeposit').notNullable();
      //table.string('lease_agreement'); // Optional reference to uploaded lease document
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('booking')
    .dropTableIfExists('properties')
    .dropTableIfExists('propertyTypes')
    .dropTableIfExists('users')
    .dropTableIfExists('roles');
};

// properties ku dar
// maplink, lat, long,
// propertyType
// propertyReviews
// propertyRatings
// propertyNearbyPlaces
// propertyFacilities
// propertyRules
// propertyAmenities [pool]
// propertyServices
// propertyUtilities
// propertyLeaseTerms
// propertyTermsAndConditions
