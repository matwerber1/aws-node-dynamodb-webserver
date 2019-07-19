const express = require('express');
const app = express();
const port = 8192;
const aws = require('aws-sdk');
const ddb = new aws.DynamoDB.DocumentClient({ region: 'us-east-1'});

var partitionKey = '1';

var params = {
  TableName : 'website',
  Key: {
    partition: partitionKey
  }
};

ddb.get(params, function(err, data) {

  var message = 'Hello World!<br/><br/>';
  
  if (err) {
    // if call to DynamoDB failed, print an error to the console
    console.log(err);
    message += 'Call to DynamoDB failed!';
  }
  else {
    console.log(data);
    message += `DynamoDB partition key ${partitionKey} has message: ${data.Item.message}`;
  }
    
  // for any incoming request, print the contents of message variable
  app.get('/', (req, res) => res.send(message));
    
    // start the web server
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  
});
