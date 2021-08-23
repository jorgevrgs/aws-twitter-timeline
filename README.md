# Portfolio Page

Simple portfolio serverless appllication build on AWS Amplify

## Technical Specifications

Full-stack solution using AWS. Demo [here](https://www.loom.com/share/02603783d2774206b8c5d6204b1c4f6c).

### Pre-requisites for installation

- Node.js > 12.x
- Npm > 6.x
- AWS Account ([Creare AWS Account](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start))
- Amplify CLI
- Twitter developer account ([Read the documentation](https://developer.twitter.com/en/docs/getting-started))

### Stack

Backend:

- [AWS Amplify](https://aws.amazon.com/amplify/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [Express.js](https://expressjs.com/)
- [Lambda](https://aws.amazon.com/lambda/)
- [Twitter API V2](https://developer.twitter.com/en/docs/twitter-api)

Frontend:

- [Vue.js v3 Options API](https://vuejs.org/)
- [Vue CLI](https://cli.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Cognito](https://aws.amazon.com/cognito/)

## Installation

### Install the Amplify CLI

```
npm install -g @aws-amplify/cli
```

### Configure the Amplify CLI

```
amplify configure
```

## Deploy

### Twitter Bearer Token

The application uses Twitter OAuth 2.0 Bearer Token to get information from the Twitter's API:

- [OAuth 2.0 Bearer Token](https://developer.twitter.com/en/docs/authentication/oauth-2-0)
- [Developer Portal](https://developer.twitter.com/en/portal/dashboard)

Create an App in your [Projects & Apps](https://developer.twitter.com/en/portal/projects-and-apps) section and copy the value of the **Bearer Token** from your settings section `Keys and tokens`.

Copy this value in your [Environment variables](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html) with the name `TWITTER_BEARER_TOKEN`.

Push backend

```
amplify push
```

Run frontent locally

```
amplify serve
```

Publish frontend

```
amplify publish
```

## Summary

- Documenting: 3 hours
- Coding: 3 hours
- Total: 6 hours
