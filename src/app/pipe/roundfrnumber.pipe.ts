import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundfrnumber'
})
export class RoundfrnumberPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    console.log(value)
    return parseInt(value.toLocaleString('fr')).toFixed(2.);
  }

}
