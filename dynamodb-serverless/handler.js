const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

exports.handler.dynamodb = (event, context, callback) => { 
  const operation = event.httpMethod;
  const payload = { 
    TableName: 'Movies'
  } 

  switch (operation) { 
    case'POST':
      dynamo.putItem(payload, callback);
      break;
    case 'PATCH':
      dynamo.updateItem(payload, callback);
      break;
    case 'DELETE':
      dynamo.deleteItem(payload, callback);
      break;
    case 'GET':
      dynamo.scan(payload, (err, data) => {
          callback(null, {
              'statusCode': 200,
              'headers': {},
              'body': JSON.stringify(data)
           });
      });
      break;
    default:
      callback(new Error(`Unrecognized operation "${operation}"`));
    }
};