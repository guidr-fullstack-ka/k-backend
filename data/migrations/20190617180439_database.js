
exports.up = async function(knex, Promise) {
  await knex.schema.createTable('users', tbl => {
    tbl.increments();

    tbl
      .string('username', 255)
      .notNullable()
      .unique();

    tbl
      .string('password', 128)
      .notNullable();
    
    tbl.string('title', 128);
    
    tbl.string('tagline', 128);

    tbl.float('timeLength');
  });

  await knex.schema.createTable('trips', tbl => {
    tbl.increments();

    tbl
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    
    tbl
      .string('name', 255)
      .notNullable();

    tbl.float('duration');

    tbl.string('state');
    
    tbl.string('city');

    tbl.integer('zipcode');

    tbl.boolean('professional').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('trips')
    .dropTableIfExists('users');
};
