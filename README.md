# serverless-auction-app
## link for a template-url: https://github.com/codingly-io/sls-base

## command to create a serverless app with a tempalte
```
sls create --template-url https://github.com/codingly-io/sls-base --name aws-serverless-auction-app
```

## command to delete the whole application
```
sls remove -v
```

## command to deploy a particular function
```
$ sls deploy -f <name of the lambda function from .yml file> -v
```

## env. variables
accessing the process variables for a cloud formation 

-in .yml file
### functions b4 deploying
Ref - every service return a name of a service ```!Ref <name of the resource```
GetAtt - getting an arn of a service ```!GetAtt <name of the service>.Arn```

-in .js file
within the .yml file in provider createa an object ```environment: ${self:<name of variable in custom>.<name of the variable>}```
in .js file acces the env. variable with process.env.NAME_OF_ENV_VAR