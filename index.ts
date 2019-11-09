import * as child from 'child_process';

class DotnetSolution{
    private outDir = 'outDir';
    private appNamespace : string = 'Awesomeness.Domain';
    constructor(){
        
    }

    create = () => {
        // Create 
        console.log('starting creation .. ')
        child.execSync(`dotnet new sln --name ${this.appNamespace}`);
        child.execSync(`dotnet new mvc --name ${this.appNamespace}.Api`);
        child.execSync(`dotnet new classlib --name ${this.appNamespace}.Core`);
        child.execSync(`dotnet new classlib --name ${this.appNamespace}.Infrastructure`);
        // add to sln 
        console.log('adding projs to sln ... ');
        child.execSync(`dotnet sln ${this.appNamespace}.sln add ${this.appNamespace}.Core/${this.appNamespace}.Core.csproj`);
        child.execSync(`dotnet sln ${this.appNamespace}.sln add ${this.appNamespace}.Infrastructure/${this.appNamespace}.Infrastructure.csproj`);
        child.execSync(`dotnet sln ${this.appNamespace}.sln add ${this.appNamespace}.Api/${this.appNamespace}.Api.csproj`);


        // referrences 
        console.log('creating references...');
        child.execSync(`dotnet add ${this.appNamespace}.Core/${this.appNamespace}.Core.csproj reference ${this.appNamespace}.Infrastructure/${this.appNamespace}.Infrastructure.csproj`);
        child.execSync(`dotnet add ${this.appNamespace}.Api/${this.appNamespace}.Api.csproj reference ${this.appNamespace}.Core/${this.appNamespace}.Core.csproj`);
        child.execSync(`dotnet add ${this.appNamespace}.Api/${this.appNamespace}.Api.csproj reference ${this.appNamespace}.Infrastructure/${this.appNamespace}.Infrastructure.csproj`);
        console.log('All Done ...isn\'t it pretty :-\)');
    }
}

let dotnet = new DotnetSolution().create(); 