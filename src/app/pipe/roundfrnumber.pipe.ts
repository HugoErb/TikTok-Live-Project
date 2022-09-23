import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundfrnumber'
})
export class RoundfrnumberPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    console.log(Math.round(value*100)/100)
    return Math.round(value*100)/100;
  }

}
