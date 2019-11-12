# Dotnet Core App Scripting 

## Description
This node app builds a dotnet core app with the [Clean Architecture](https://github.com/ardalis/CleanArchitecture/tree/master/src)  project pattern, and alot more.... 

## Features: 
- Creates projects, referrences, and adds to solution
- Installs a default set of packages (eg: swagger, moq, etc)
- Creates an organized folder structure
- Creates Dockerfiles for projects marked as `dockerize` (wip)
- Pushes the solution to a github repo when passed the `--repo` flag

___

## Solution Strucutre 

`App.sln`

`App.Api`

`App.Core` > Business logic and Interfaces

`App.Core.Tests` > Tests for business logic

`App.Infrastrucutre` > Interface Implementations that are technology specific 


__________

## Generating The Solution 
```
npx ts-node index.ts --name {Your Desired Namespace} --repo {githubRepo}
```
_______

## Output Directory
Solution will be added to the `out` directory 
should look like this 
```
| out
|--> App.sln
|-----> App.Core
|-----> App.Core.Tests
|-----> App.Infrastructure
|-----> App.Api
|-----> .dockerignore
|-----> App.Api.dockerfile
|-----> .gitignore



```
_______

## WIP: 
- dockerfile project mapping 
- add helm file support for k8's
- create azure devops pipeline 