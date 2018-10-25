
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
        id: 1,
        name: 'steven',
        weight: 185,
        height: 6,
        age: 30
      }]);
    })
    .then(() => {
      return knex('sleep').insert([{
        id: 1,
        user: 1,
        hourCount: 8,
        startHour: '02:05 PM',
        endHour: '10:05 PM',
        nightSlept: '2018-08-22'
      }])
    })
    .then(() => {
      return knex('calories').insert([{
        id: 1,
        user: 1,
        food: 'pizza',
        ndbno: 21272,
        calories: 200,
        protein: 100,
        carbs: 100,
        fiber: 50,
        sugar: 100, 
        fat: 100
      }])
    })
};
