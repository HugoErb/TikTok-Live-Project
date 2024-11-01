import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frnumber'
})
export class FrnumberPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return value.toLocaleString('fr');
  }

}
