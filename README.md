## Deprecated

This project has been deprecated. If you need a cli client for testengine consider using the more up to date [testengine-cli](https://www.npmjs.com/package/testengine-cli)

## Ready API Test Server CLI

A simple node-based command-line client for the [Ready!API TestServer](http://readyapi.smartbear.com/testserver/start)


## Usage

Install with 

```
npm install ready-api-testserver-cli
```

Run with 

```
testserver -u <username> -p <password> -s <testserver-endpoint> recipe/project file
```

which will execute the specified recipe or project file (or folder for composite projects)
and print the results to the console, for example

```
127:ready-api-testserver-cli ole$ testserver -u XXX -p YYY -s http://<testserver-host>:8080 recipes/simple-test-recipe.json
Ready! API TestServer Command-Line Interface 1.0.3
Response: 200
{
    "projectName": "Recipe REST Project",
    "status": "FINISHED",
    "testSuiteResultReports": [
      {
        "testSuiteName": "Recipe Test Suite",
        "testCaseResultReports": [
          {
            "testCaseName": "Recipe Test Case",
            "testStepResultReports": [
              {
                "testStepName": "GET request 1",
                "assertionStatus": "UNKNOWN",
                "timeTaken": 96,
                "messages": []
              }
            ]
          }
        ]
      }
    ],
    "timeTaken": 167,
    "startTime": 1453842267334,
    "executionID": "f4a47bbc-bd50-4b54-91df-5b7ef4a418bf",
    "unresolvedDataSources": []
}
```

### Using a config file

If you don't want to specify username/password/server every time you can create
a config.jsonfile:

```
{
    "server"   : "<server endpoint>",
    "username" : "<username>",
    "password" : "<password>"
}
```

in which case you can either specify the name of the config file with the -c argument, or
not specify anything except the recipe/xml if the config file is named config.json and in the current 
folder. The above invocation would now just be

```
127:ready-api-testserver-cli ole$ testserver recipes/simple-test-recipe.json
Ready! API TestServer Command-Line Interface 1.0.3
Reading config from config.json
Response: 200
{
...
}
```

### Cucumber Support

This project includes a generic cucumber.js vocabulary for API testing that uses the Ready! API TestServer to 
execute defined features. Simply run cucumber.js in the root folder which will detect the sample feature(s) in the
features folder and run them. The actual supporting code for step definitions and required world/hook definitions
are in the features/support folder.

