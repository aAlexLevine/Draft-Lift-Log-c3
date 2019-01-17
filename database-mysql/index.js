var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  // password : 'FILL_ME_IN',
  database : 'test'
});

const selectAll = function(callback) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM logs', function(err, results, fields) {
      if(err) {
        // callback(err, null);
        reject(err)
      } else {
        // callback(null, results);
        resolve(results)
        console.log('--',results)
      }
    });
  })

};

const createNewWorkOut = (data) => {
  console.log('dataaaaa',data)
  
  return new Promise((resolve, reject) => {
  connection.query(`
    INSERT INTO logs (date, user_id, plan_id, plan_group)
    VALUES (now(), ${data.userID}, ${data.plan}, ${data.planGroup});`, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        // return results
        resolve(results)
      }
    })
  })
}


const getPlans = (userID) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM plans WHERE user_id =${userID};`, (err, results, fields) => {
      // connection.query(`
      //     SELECT * 
      //     FROM plans 
      //     INNER JOIN groups ON plans.id=groups.plan_id;`, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

const getGroups = planID => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM groups WHERE plan_id =${planID};`, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}


module.exports = {
  selectAll,
  createNewWorkOut,
  getPlans,
  getGroups
};
