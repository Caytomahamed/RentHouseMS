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
      table.integer('lat');
      table.integer('long');
      table.integer('bathrooms');
      table.decimal('rentAmount').notNullable();
      table.boolean('available').notNullable().defaultTo(true); // true if the property is available for rent
      table.text('description');
      table.integer('landLordId').notNullable().unsigned();
      table
        .foreign('landLordId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('propertyTypeId').notNullable().unsigned();
      table
        .foreign('propertyTypeId')
        .references('id')
        .inTable('propertyTypes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.specificType('imageUrls', 'text[]'); // Array of image URLs [SQLITE]
      // table.json('imageUrls');
    })
    .createTable('booking', function (table) {
      table.increments('id').primary();
      table.integer('propertyId').notNullable().unsigned();
      table
        .foreign('propertyId')
        .references('id')
        .on('properties')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('tenantId').notNullable().unsigned();
      table
        .foreign('tenantId')
        .references('id')
        .on('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.boolean('isMoveIn').defaultTo(false);
      table.boolean('isConfirm').defaultTo(false);
      table.boolean('isReject').defaultTo(false);
      table.boolean('isCanclellation').defaultTo(false);
      table.date('startDate').notNullable();
      table.date('endDate').notNullable();
      table.string('cancellationStatus');
      table.date('cancellationRequestedAt');
      table
        .string('leaseAgreement')
        .defaultTo(
          'https://docs.google.com/document/d/1d9RoFWCsiNR9XTmht3za25zCzEix4fC3vyRP1fHleOg/edit?usp=sharing',
        );
      table.timestamps(true, true); // This will create 'created_at' and 'updated_at' columns
    })
    .createTable('payments', function (table) {
      table.increments('id').primary();
      table.integer('bookingId').unsigned().notNullable();
      table
        .foreign('bookingId')
        .references('id')
        .inTable('booking')
        .onDelete('CASCADE');
      table.decimal('amount', 10, 2).notNullable();
      table
        .enu('status', ['pending', 'completed', 'failed'])
        .notNullable()
        .defaultTo('pending');
      table.string('paymentMethod').notNullable();
      table.string('transactionId').unique().notNullable();
      table.timestamp('paidAt').nullable();
      table.timestamps(true, true); 
      table.decimal('securityDeposit').notNullable();

      table.index(['bookingId', 'status']); // Adding index for faster queries on booking_id and status
    })
    .createTable('maintenanceRequests', function (table) {
      table.increments('id').primary();
      table.integer('bookingId').notNullable().unsigned();
      table.string('type').notNullable();
      table
        .foreign('bookingId')
        .references('id')
        .on('booking')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('tenantId').unsigned().notNullable();
      table
        .foreign('tenantId')
        .references('id')
        .on('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.boolean('isIssue').defaultTo(false);
      table.text('description').notNullable();
      // table.enu('status', ['pending', 'completed', 'rejected']).notNullable();
      table.string('expectedDate', 50).notNullable();
      table.string('status', 50).notNullable().defaultTo('pending');
      table.timestamps(true, true);
    })
    .createTable('reviews', function (table) {
      table.increments('id').primary();
      table.integer('propertyId').unsigned().notNullable();
      table.integer('tenantId').unsigned().notNullable();
      table.integer('rating').unsigned().notNullable().checkBetween([1, 5]);
      table.text('comment');
      table.timestamps(true, true);

      table
        .foreign('propertyId')
        .references('id')
        .inTable('properties')
        .onDelete('CASCADE');
      table
        .foreign('tenantId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
    })
    .createTable('inbox', table => {
      table.increments('id').primary();
      table
        .integer('senderId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table
        .integer('receiverId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.string('FromOrTo').notNullable();
      table.string('subject').notNullable();
      table.text('message').notNullable();
      table.boolean('is_read').defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('inbox')
    .dropTableIfExists('reviews')
    .dropTableIfExists('maintenanceRequests')
    .dropTableIfExists('payments')
    .dropTableIfExists('booking')
    .dropTableIfExists('properties')
    .dropTableIfExists('propertyTypes')
    .dropTableIfExists('users')
    .dropTableIfExists('roles');
};
