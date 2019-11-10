import Args from './args';
import DotnetSolution from './solution';

let name = new Args().getArgs('name');
console.log(name);
if(name != undefined){
    let dotnet = new DotnetSolution(name).create(); 
}
