use('sample');  
const filterUser = db.getCollection('users').find({ age: { $gt: 25 } });

console.log(filterUser);