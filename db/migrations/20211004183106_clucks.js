
exports.up = function(knex) {
    return knex.schema.createTable("clucks", table => {
      
      table.string('title');
      table.text("imageUrl");
      table.text('content')
      table.increments("id");
      table.integer("viewCount");
      table.string("tags");
   
      table.timestamp("createdAt").defaultTo(knex.fn.now()); //if will print current time 
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("clucks"); 
  };
  