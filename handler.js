'use strict';
const AWS = require("aws-sdk");

module.exports.hello = async event => {


  // console.log('connection! ', event)
  console.log('connectionnn! ', event.requestContext.connectionId)
  // console.log('connection! ', JSON.stringify(event))
  
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
      ),
    };
    
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
  };
  
  module.exports.connectionHandler = async event => {
    
    const connectionId = event.requestContext.connectionId

    console.log('connectionnn! ', event.requestContext.connectionId)
  // console.log('connection! ', event)
  console.log('connection! ', JSON.stringify(event))

  sendMessageToClient(event, connectionId, {"data": "hey"})

  console.log('hmm')
  // return null

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: 'Go Serverless v1.0! Your function executed successfully!',
  //       input: event,
  //     },
  //     null,
  //     2
  //   ),
  // };

}
module.exports.disconnectionHandler = async event => {

  console.log('disconnection! ', event)
  // console.log('connection! ', JSON.stringify(event))

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

}

module.exports.defaultHandler = async event => {

  console.log('default! ', event)
  // console.log('connection! ', JSON.stringify(event))

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

}

module.exports.fooHandler = async event => {

  console.log('\nfoo! ', event)
  // console.log('connection! ', JSON.stringify(event))

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

}

const sendMessageToClient = (event, connectionId, payload) =>
  new Promise((resolve, reject) => {

    console.log('e', event)
    console.log('e', event.requestContext)

    console.log('calling... ', "ws://" + event.requestContext.domainName + '/' + event.requestContext.stage)

    const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: "ws://" + event.requestContext.domainName + ':3000/' + event.requestContext.stage,
    });
    apigatewaymanagementapi.postToConnection(
      {
        ConnectionId: connectionId, // connectionId of the receiving ws-client
        Data: JSON.stringify(payload),
      },
      (err, data) => {
        if (err) {
          console.log('err is', err);
          reject(err);
        }
        resolve(data);
      }
    );
  });
