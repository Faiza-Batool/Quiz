const faker = require("faker")
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('clucks').del()
    .then(function () {
      // Inserts seed entries
      const clucks = [];
      for (let i = 0; i < 100; i++) {
        clucks.push(
          {
            title: faker.name.firstName(),
            imageUrl: faker.image.imageUrl()
          }
        )
      }
      return knex('clucks').insert(clucks);
    });
};
