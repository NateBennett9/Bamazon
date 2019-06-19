var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Jason123!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected");
    createTable();
});

var createTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(
                res[i].itemid + 
                " || " + res[i].productname +
                " || " + res[i].departmentname + 
                " || " + res[i].price +
                " || " + res[i].stockquantity + 
                "\n");
        }
        promptCustomer(res);
    })

}

var promptCustomer = function (res) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What would you like to purchase? [Type X to Exit]"
    }]).then(function (answer) {
        var correct = false;
        if(answer.choice.toUpperCase()=="X"){
            process.exit();
        }
        for (var i = 0; i < res.length; i++) {
            if (res[i].productname == answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;
                inquirer.prompt({
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to buy?",
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function(answer) {
                    if ((res[id].stockquantity - answer.quantity) > 0) {
                        connection.query("UPDATE products SET stockquantity='" + (res[id].stockquantity - answer.quantity) + "' WHERE productname= '" + product + "'", function (err, res2) {
                            console.log("Product Purchased");
                            createTable();
                        })
                    } else {
                        console.log("Invalid selection");
                        promptCustomer(res);
                    }
                })
                    }
        }
        if(i==res.length && correct==false){
            console.log("Invalid selection");
            promptCustomer(res);
        }
    })
}