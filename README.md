# Ready API Test Server CLI

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

which will execute the specified recipe or project file and print the results to the console, for example



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
folder.

Sample run:

```
127:ready-api-testserver-cli ole$ testserver recipes/simple-test-recipe.json
Ready! API TestServer Command-Line Interface 1.0.0
Reading config from config.json
Using config: {"server":"http://XXX","username":"XXX","password":"XXX"}
Response: 200
Got response: {
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