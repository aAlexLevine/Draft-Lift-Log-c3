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
  return connection.query(`
    INSERT INTO logs (date, user_id, plan_id, plan_group)
    VALUES (now(), 1, 1, 'B');`,
    (err, results) => {
      if (err) {
        console.log(err)
      } else {
        // return results
        console.log(results)
      }
    })
}


module.exports = {
  selectAll,
  createNewWorkOut
};
