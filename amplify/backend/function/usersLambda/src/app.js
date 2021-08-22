/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require("aws-sdk");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const express = require("express");

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "users";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const partitionKeyName = "id";
const path = "/users";
const UNAUTH = "UNAUTH";
const hashKeyPath = "/:" + partitionKeyName;

// declare a new express app
let app = express();
app.use(express.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// get
const getItem = (getItemParams) => {
  return new Promise((resolve, reject) => {
    dynamodb.get(getItemParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Item || data);
      }
    });
  });
};

// put
const updateItem = (putItemParams) => {
  return new Promise((resolve, reject) => {
    dynamodb.put(putItemParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + hashKeyPath, async function (req, res) {
  let params = {};
  params[partitionKeyName] =
    req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;

  let getItemParams = {
    TableName: tableName,
    Key: params,
  };

  try {
    const data = await getItem(getItemParams);
    res.json(data);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "Could not load items: " + err.message });
  }
});

/************************************
 * HTTP post method for insert object *
 *************************************/

app.put(path + hashKeyPath, async function (req, res) {
  req.body[partitionKeyName] =
    req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;

  let putItemParams = {
    TableName: tableName,
    Item: req.body,
  };

  try {
    const data = await updateItem(putItemParams);
    res.json({
      success: "update call succeed!",
      url: req.url,
      data: data,
    });
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
