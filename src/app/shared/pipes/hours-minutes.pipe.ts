import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursMinutes',
  standalone: true,
})
export class HoursMinutesPipe implements PipeTransform {
  // "any" used to account for key value pairs
  transform(minutes: string | number): string {
    const timeStart: number = parseInt(minutes.toString());
    const hrs = Math.floor(timeStart / 60);
    const min = timeStart % 60;
    let timeText = '';
    if (hrs > 0) {
      timeText += `${hrs} hour`;
      if (hrs > 1) {
        timeText += `s`;
      }
      timeText += ' ';
    }
    if (min > 0) {
      timeText += `${min} minute`;
      if (min > 1) {
        timeText += `s`;
      }
    }
    return timeText;
  }
}
