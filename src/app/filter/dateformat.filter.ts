import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})

@Injectable()
export class DateFormatPipe implements PipeTransform {
  public days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  transform(items: string): string {
    const d = new Date(items);
    return (this.days[d.getDay()] + ' ' +
      d.getDate() + ' ' +
      this.monthNames[d.getMonth()] + ' ' +
      d.getFullYear());
  }
}
