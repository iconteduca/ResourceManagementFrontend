import {Pipe} from '@angular/core';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'AllocazionePipe'
})
export class AllocazionePipe {

  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(value:any, args?:any) {
    // ES6 array destructuring
   
    return value.filter( );
  }

}
