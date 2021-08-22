/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const axios = require("axios");

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

axios.defaults.headers.common["Authorization"] =
  "Bearer " + process.env.TWITTER_BEARER_TOKEN;

/**********************
 * Example get method *
 **********************/

app.get("/twitter/username/:username", async function (req, res) {
  try {
    const { username } = req.params;

    const url = `https://api.twitter.com/2/users/by/username/${username}`;
    let response = await axios.get(url, {
      params: {
        "user.fields": "profile_image_url,created_at,name",
      },
    });

    res.json(response.data?.data);
  } catch (err) {
    res.statusCode = 500;
    res.json({
      error: "Could not load items: " + err.message,
    });
  }
});

app.get("/twitter/timeline/:id", async function (req, res) {
  try {
    const { id } = req.params;

    const url = `https://api.twitter.com/2/users/${id}/tweets`;

    const response = await axios.get(url, {
      params: {
        max_results: 5,
        "tweet.fields":
          "author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,possibly_sensitive,reply_settings,source,text,withheld",
      },
    });

    res.json(response.data?.data);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "Could not load items: " + err.message });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
