exports.up = function(knex, Promise) {
  return knex.schema.createTable('file', function(table){
      table.increments();
      table.text('name');
      table.text('content');
      table.text('timestamp');
    });
  };
  exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('file');
};
