// This is Version 2 of the CDK
const { Stack } = require('aws-cdk-lib');
const { Construct } = require("constructs");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const lambda = require("aws-cdk-lib/aws-lambda");

class CrmBackendServiceStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new CRMBackendService(this, 'CRMBackend')
  
  }
}

class CRMBackendService extends Construct {
  constructor(scope, id) {
    super(scope, id);

    const handler = new lambda.Function(this, "CRMBackendHandler", {
      runtime: lambda.Runtime.NODEJS_14_X, // So we can use async in widget.js
      code: lambda.Code.fromAsset("resources"), // Copy files from /build/server into resources
      handler: "serverless.handler",
      environment: {}
    });

    new apigateway.LambdaRestApi(this, 'crmbackend-api', {
      handler: handler,
      description: "This service serves crmbackend.",
      restApiName: "CRMBackend Service",
      proxy: true
    });

  }
}

module.exports = { CrmBackendServiceStack }
