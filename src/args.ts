export function getArgs (argName: string) : string | undefined{
        let args = process.argv; 
        let indexOfName = args.indexOf(`--${argName}`);
        return indexOfName == -1 ? undefined : args[indexOfName+1]
}
