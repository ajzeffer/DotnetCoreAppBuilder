import * as child from 'child_process';


export function gitGoing(repo:string){
    if(repo == undefined)
        return;
    console.log('starting git tasks...');
    child.execSync('cd out && git init', {stdio: 'inherit'})
    child.execSync('git -C out add . ', {stdio: 'inherit'})
    child.execSync('git -C out commit -m "init: initial scaffolding"', {stdio: 'inherit'})
    child.execSync(`git -C out remote add dti ${repo}`, {stdio: 'inherit'})
    child.execSync(`git -C out push dti HEAD`, {stdio: 'inherit'})
    
}