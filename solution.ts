import * as child from 'child_process';

interface IProject{
    projName: string;
    dependencies: string[];
    projType: string;
}

export default class DotnetSolution{
    private projects: IProject[] = [];
    private appNamespace : string = 'Awesomeness.Domain';
    private outDir : string = 'out'
    constructor(appName: string){
        this.appNamespace = appName;
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
        console.log('creating references...');
        this.projects.forEach(proj => {
            proj.dependencies.forEach(dep => {
                child.execSync(`dotnet add ${this.outDir}/${this.appNamespace}.${proj.projName}/${this.appNamespace}.${proj.projName}.csproj reference ${this.outDir}/${this.appNamespace}.${dep}/${this.appNamespace}.${dep}.csproj`);
            })
        });
        console.log('All Done ...isn\'t it pretty :-\)');
    }
}