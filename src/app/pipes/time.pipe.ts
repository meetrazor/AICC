import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    const days = Math.floor(value / (60 * 60 * 24));
    const hours = Math.floor(value % (60 * 60 * 24) / (60 * 60));
    const minutes = Math.floor(value % (60 * 60) / (60));
    const seconds = Math.floor(value % 60);

    if (args === 'h:m:s') {
      return (hours.toString().length === 1 ? '0' : '') + hours + ':' +
        (minutes.toString().length === 1 ? '0' : '') + minutes + ':' + (seconds.toString().length === 1 ? '0' : '') + seconds;
    }

    if (args === 's') {
      return (seconds.toString().length === 1 ? '0' : '') + seconds;
    }
    if (args === 'm:s') {
      return (minutes.toString().length === 1 ? '0' : '') + minutes + ' m' + ':' + (seconds.toString().length === 1 ? '0' : '')
        + seconds + ' s';
    } else {
      return (days.toString().length === 1 ? '0' : '') + days + 'd ' + (hours.toString().length === 1 ? '0' : '') + hours + 'h ' +
        (minutes.toString().length === 1 ? '0' : '') + minutes + 'm ' + (seconds.toString().length === 1 ? '0' : '') + seconds + 's';
    }
  }


}
