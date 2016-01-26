# Ready API Test Server CLI

A simple node-based command-line client for the [Ready!API TestServer](http://next.readyapidocs.sthlm.smartbear.local/testserver/start)

## Usage

Install with 

```
npm install ready-api-testserver-cli
```

Run with 

```
testserver -u <usernam> -p <password> -s <testserver-endpoint> recipe/project file
```

which will execute the specified recipe or project file and print the results to the console

### Using a config file

If you don't want to specify username/password/server every time you can create
a config.json file:

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