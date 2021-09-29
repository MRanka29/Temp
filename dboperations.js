var config = require('./dbconfig');
const sql = require('mysql');  //This is how we load libraries in Node.js
const sql1 = require('mssql');



async function getOrders(){
    console.log(config.server);
    try{
        //let pool = await sql.connect(config);
        //config.log("trying to connect with DB");
        //let pool = await sql.connect(config);
        //let products = await pool.request().query("SELECT * FROM wpx2_wc_order_stats where order_");
        var orderId = 635;
        //let products = await pool.request().input('input_parameter', sql.Int, orderId).query("SELECT * from wpx2_wc_order_stats where Id = @input_parameter");
        //return products.recordsets;

        let pool = sql.createConnection(config);
        pool.connect();
        pool.query(`SELECT * FROM giftsdmm_test`, function(err, rows, fields) 
        {
          if (err) throw err;
        
          console.log(rows[0]);
        });
        //console.dir(result)
    }
    catch (error){
        console.log(error);
    }
}

async function getOrder(orderId){
    try{
        let pool = await sql.connect(config);
        //let product = await pool.request().input('input_parameter', sql.Int, orderId).query("SELECT * from TableName where Id = @input_parameter");
        //return product.recordsets;
        return;
    }
    catch (error){
        console.log(error);
    }
}

//async function addOrder(order){
//    try{
//        let pool = await sql.connect(config);
//        let insertProduct = await pool.request()
//        .input('Id', sql.Int, orderId).query("SELECT * from TableName where Id = @input_parameter");
//        return products.recordsets;
//    }
//    catch (error){
//        console.log(error);
//    }
//}

module.exports ={
    getOrders : getOrders,
    getOrder : getOrder
}