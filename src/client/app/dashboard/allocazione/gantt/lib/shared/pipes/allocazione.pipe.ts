import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'allocazione'
})
export class AllocazionePipe implements PipeTransform {
    transform(value: any, [status]:any): any {
        return value.filter((item:any) => item.status === status);
    }
}