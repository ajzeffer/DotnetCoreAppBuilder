import * as child from 'child_process';
import {IProject, IPackage} from './interfaces';

export default class DotnetSolution{
    // private props 
    public projects: IProject[] = [];
    private appNamespace : string = '';
    private  outDir : string = 'out'
    
    
    constructor(appName: string){
        this.appNamespace = appName;
        let projApi :IProject =  {
                projName :"Api",
                dependencies : ["Core", "Infrastructure"], 
                projType: "mvc", 
                pacakges: [
                    { packageName: "Swashbuckle.AspNetCore", version: "4.0.1" }], 
                dockerize: true, 
                folders: ["helm"]
        };
        this.projects.push(projApi);

        let projCore : IProject = {
            projName: "Core", 
            dependencies: ["Infrastructure"], 
            projType: "classlib", 
            pacakges: [], 
            dockerize: false, 
            folders: ["Models", "Interfaces", "Types"]
        }
        this.projects.push(projCore);

        let projCoreTests : IProject = {
            projName: "Core.Tests", 
            dependencies: ["Core","Infrastructure"], 
            projType: "xunit", 
            pacakges: [{packageName: "Moq", version: "4.13.1"}], 
            dockerize: false,
            folders: []
        }
        this.projects.push(projCoreTests);

        let projInfra: IProject = {
            projName: "Infrastructure", 
            dependencies: [], 
            projType: "classlib", 
            pacakges: [],
            dockerize: false,
            folders: []
        }
        this.projects.push(projInfra);

    }

    create (): DotnetSolution {

        // Create 
        console.log('starting creation .. ')
        child.execSync(`dotnet new sln --name ${this.appNamespace} -o ${this.outDir}`);
        this.projects.forEach(proj => {
            child.execSync(`dotnet new ${proj.projType} --name ${this.appNamespace}.${proj.projName} -o ${this.outDir}/${this.appNamespace}.${proj.projName}`);
        });
        // add to sln 
        console.log('adding projs to sln ... ');
        this.projects.forEach(proj => {
        child.execSync(`dotnet sln ${this.outDir}/${this.appNamespace}.sln add ${this.outDir}/${this.appNamespace}.${proj.projName}/${this.appNamespace}.${proj.projName}.csproj`);
        });

        // referrences 
        console.log('project actions...');
        this.projects.forEach(proj => {
            // dependencies 
            proj.dependencies.forEach(dep => {
                child.execSync(`dotnet add ${this.outDir}/${this.appNamespace}.${proj.projName}/${this.appNamespace}.${proj.projName}.csproj reference ${this.outDir}/${this.appNamespace}.${dep}/${this.appNamespace}.${dep}.csproj` ,
                {stdio: 'inherit'});
            });
            // packages 
            proj.pacakges.forEach(pckg => {
                console.log(`Adding ${pckg.packageName} v ${pckg.version} to ${proj.projType}`)
                child.execSync(`dotnet add ${this.outDir}/${this.appNamespace}.${proj.projName}/${this.appNamespace}.${proj.projName}.csproj package ${pckg.packageName} -v ${pckg.version} `,
                {stdio: 'inherit'});
            });
            // folders 
            proj.folders.forEach(folder => {
                console.log(`Adding ${folder} to ${proj.projType}`)
                // makes dir and adds empty .keep file to ensure the folder is included in git 
                child.execSync(`mkdir ${this.outDir}/${this.appNamespace}.${proj.projName}/${folder} && touch ${this.outDir}/${this.appNamespace}.${proj.projName}/${folder}/.keep  `,
                {stdio: 'inherit'});
            });
        });

        // packages 
        console.log(`adding packages`); 
        this.projects.forEach(proj => {
            
        });
        console.log('All Done ...isn\'t it pretty :-\)');
        return this;
    }
}