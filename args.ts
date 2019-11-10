export class Args{
    getArgs = (argName: string) =>{
        let args = process.argv; 
        let indexOfName = args.indexOf(`--${argName}`);
        let name = args[indexOfName++];
        return name;
    }
}