
export interface IProject{
    projName: string;
    dependencies: string[];
    projType: string;
    pacakges: IPackage[];
    dockerize: boolean;
    folders: string[]
}

export interface IPackage{
    packageName: string;
    version: string;
}