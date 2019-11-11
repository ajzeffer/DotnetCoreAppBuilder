import { getArgs } from './args';
import DotnetSolution from './solution';

let name = getArgs('name');
if(name != undefined){
    let dotnet = new DotnetSolution(name).create(); 
}
