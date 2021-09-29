var Order = require('./order')
const dboperations  = require('C:\\Users\\mranka\\Documents\\nodefirst\\dboperations.js');
const https = require('https');
const requestFreshdesk = require('request');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
    console.log('abc');
    next();
}) 

router.route('/orders').get((request,response)=>{

    console.log("def");
    dboperations.getOrders().then(result => {
        console.log("result");
        response.json(result[0]); //TODO - Change this to send data via http call to freshdesk
    })
})

router.route('/orders/:id').get((request,response)=>{

    dboperations.getOrder(request.params.id).then(result => {
        //console.log(result);
        response.json(result[0]); //TODO - Change this to send data via http call to freshdesk
    })
})

router.route('/sendWhatsappMsg').get((request,response)=>{

    console.log("Hi");
    var data = {
        "from": {
          "phone_number": "+917846919730" },
        "provider": "whatsapp",
          "to": [{
            "phone_number": "+917985622741"}],
        "data": {
          "message_template": {
            "storage": "conversation",
            "template_name": "order_prepared_image",
            "namespace": "28e26c7f_abd7_4c9e_bd9f_ef5e3c2de63a",
            "language": {
              "policy": "deterministic",
              "code": "en_US"
            }
          }
        }
      }


    
      console.log("getting in post call");
      requestFreshdesk.post(
        'https://api.freshchat.com/v2/outbound-messages/whatsapp',
        { json: data },
        function (error, response1, body) {
            if (!error && response1.statusCode == 200) {
                console.log(body);
                console.log("success1");
            }
            else{
                console.log(response1.statusCode);
                console.log(error);
                console.log("no success");
            }
        }
    );
})

var port = 8090;
app.listen(port);
console.log('Order API is running at '+ port);


