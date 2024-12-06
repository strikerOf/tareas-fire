const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'striker',
  database: 'control'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
});

module.exports = connection;
