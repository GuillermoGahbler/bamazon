require('console.table')


const inquirer = require('inquirer')
const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bamazon_db'
});






function displayCatalog() {
  const statement = 'SELECT * from  products where stock_quantity>0';
  return new Promise(function (resolve, reject) {
    connection.query(statement, function (error, results, fields) {
      if (error) reject(error)
      resolve(results)
      // console.table(results);
    })
  })
}










const questions = {
  order: [{
    type: "prompt",
    name: "id",
    message: "please enter id for item you'd lile to buy",
    validate: function (choice) {
      if (Number.isInteger(parseInt(choice))) return true
      return "please enter valid item id"
    }
  }, {
    type: "prompt",
    name: "qty",
    message: "Please enter how many of these items you would like to buy.",
    validate: function (choice) {
      if (Number.isInteger(parseInt(choice))) return true
      return "please enter valid amount of items."
    }
  }]
}








function checkOrder(selections) {
  const statement = 'SELECT * from  products where item_id = ' + selections.id + ' and stock_quantity >= ' + selections.qty + ' ;'
  return new Promise(function (resolve, reject) {
    connection.query(statement, function (error, results, fields) {
      if (error) reject(error)
      resolve({
        response: results,
        order: selections
      })
      // console.table(results);
    })
  })

}









function processOrder(details) {
  const item = details.response[0];
  const qty = details.order.qty;
  if (details.response.length > 0) {
    return updateDB(details.order, item.stock_quantity)
      .then(function () {
        return '$' + (item.price * qty).toFixed(2)
      })

  }
  return "Insufficient quantity"
}








function updateDB(order, stock) {
  console.log(order)
  console.log(stock)
  const statement=`update products set stock_quantity = ${stock - order.qty} where item_id = ${order.id};`;
  return new Promise(function (resolve, reject) {
    connection.query(statement, function (error, results, fields) {
      if (error) reject(error)
      resolve(results)
    })
  })
}

















connection.connect();
displayCatalog()
  .then(function (data) {
    return console.table(data)
  })
  .then(function () {
    return inquirer
      .prompt(questions.order)
  }).then(function (selections) {
    return checkOrder(selections)
  }).then(function (results) {
    return processOrder(results);
  }).then(function (price) {
    console.log(price)
  })
  .catch(function (error) {
    console.log(error)
  })
  .then(function () {
    connection.end();
  })