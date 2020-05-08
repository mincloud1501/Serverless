var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
  endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2013;
var title = "Rush";

var params = {
    TableName: table,
    Key:{
        "year": year,
        "title": title
    }
};

///////////////////////////////////////////////////////////////////////////

const createResponse = (status, body) => ({
  statusCode: status,
  body: JSON.stringify(body)
});

exports.readMovie = (event, ctx, callback) => {

  docClient.get(params, function(err, data) {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      }
  });
};