import { getArgs } from './args';
import DotnetSolution from './solution';
import * as child from 'child_process';
import { gitGoing } from './git';


let name = getArgs('name');

// create solution 
if(name != undefined){
    let dotnet = new DotnetSolution(name).create(); 
    dotnet.projects
            .filter((proj) =>  proj.dockerize )
            .forEach((proj) => {
                child.execSync(`awk '{sub(/{REPLACE}/,"${proj.projName}.dll")}1' docker/dockerfile > out/${proj.projName}.dockerfile`, {stdio: "inherit"})
            });


    // move .dockerignore out 
    child.execSync('cp docker/.dockerignore out')
    // move .gitignore to out 
    child.execSync('cp git/.gitignore out')

    // push to git
    let repo = getArgs('repo');
    console.log(repo);
    if(repo != undefined){
       gitGoing(repo);
    }
}

