exports.up = function(knex, Promise) {
  return knex.schema.createTable('file_users', function(table){
      table.increments();
      table.integer('file_id').references("id").inTable("file").onDelete("CASCADE");
      table.integer('users_id').references("id").inTable("users").onDelete("CASCADE")
    });
  };
  exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('file_users');
};
