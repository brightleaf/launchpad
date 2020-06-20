# Brightleaf Launchpad

CLI and library for deploying code to AWS S3 and AWS Lambda

```
npm install @brightleaf/launchpad --save-dev
npm run build
npx liftoff upload
npm run build:lambdas
npx liftoff upload ???
npx liftoff promote
```

Example launchpad.yml

```
app: Launchpad

buildDir: ./build

env:
  dev:
    bucket: devbucket
  stage:
    bucket: stagebucket

functions:
  hello:
    handler: example/functions/handler.hello
    name: Brightleaf-HelloHandler-${self:provider.stage}
    events:
      - http:
          path: /
          method: get
          cors: true
```