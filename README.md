# Dotnet Core App Scripting 

This node app builds a dotnet core app with the [Clean Architecture](https://github.com/ardalis/CleanArchitecture/tree/master/src)  project pattern

Top Level 

`App.sln`

`App.Api`
`App.Core` > Business logic and Interfaces

`App.Infrastrucutre` > Interface Implementations that are technology specific 


__________

## Building The Solution 
```
npx ts-node index.ts --name {Your Desired Namespace}
```
_______

## Output Directory
Solution will be added to the `out` directory 
should look like this 
```
| out
|--> App.sln
|-----> App.Core
|-----> App.Infrastructure
|-----> App.Api


```
_______

## To Do: 
- add docker support 
- add helm file support for k8's 
- create github repo and push first commit 
- create azure devops pipeline 