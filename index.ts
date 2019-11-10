import * as child from 'child_process';
import Args from 'args';
interface IProject{
    projName: string;
    dependencies: string[];
    projType: string;
}


class DotnetSolution{
    private outDir = 'outDir';
    private projects: IProject[] = [];
    private appNamespace : string = 'Awesomeness.Domain';
    constructor(appName: string){
        this.appNamespace = this.appName;
        let projApi :IProject =  {
                projName :"Api",
                dependencies : ["Core", "Infrastructure"], 
                projType: "mvc"
        };
        this.projects.push(projApi);

        let projCore : IProject = {
            projName: "Core", 
            dependencies: ["Infrastructure"], 
            projType: "classlib"
        }
        this.projects.push(projCore);

        let projInfra: IProject = {
            projName: "Infrastructure", 
            dependencies: [], 
            projType: "classlib"
        }
        this.projects.push(projInfra);

    }

    create = () => {
        // Create 
        console.log('starting creation .. ')
        child.execSync(`dotnet new sln --name ${this.appNamespace}`);
        this.projects.forEach(proj => {
            child.execSync(`dotnet new ${proj.projType} --name ${this.appNamespace}.${proj.projName}`);
        })
        // add to sln 
        console.log('adding projs to sln ... ');
        this.projects.forEach(proj => {
        child.execSync(`dotnet sln ${this.appNamespace}.sln add ${this.appNamespace}.${proj.projName}/${this.appNamespace}.${proj.projName}.csproj`);
        });

        // referrences 
        console.log('creating references...');
        this.projects.forEach(proj => {
            proj.dependencies.forEach(dep => {
                child.execSync(`dotnet add ${this.appNamespace}.${proj.projName}/${this.appNamespace}.${proj.projName}.csproj reference ${this.appNamespace}.${dep}/${this.appNamespace}.${dep}.csproj`);
            })
        });
        console.log('All Done ...isn\'t it pretty :-\)');
    }
}

// get args 
let name = new Args().getArgs('name');
let dotnet = new DotnetSolution(name).create(); 