export interface Project {
    id: string;
    name: string;
    tasks: Task[] 
}

export interface Task {

    id: string;
    name: string;
    project:string;
    start: Date;
    percentAllocation: string;
    end:Date; 
    percentComplete?: number;
    treePath?: string;
    
 
}

export interface IGanttOptions {
    scale?: IScale;
    zooming?: string;
}

export interface IScale {
    start?: Date;
    end?: Date;
}

export interface IBarStyle {
    status: string;
    backgroundColor: string;
    border: string;
    progressBackgroundColor: string;
}

export enum Zooming {
    hours,
    days
}