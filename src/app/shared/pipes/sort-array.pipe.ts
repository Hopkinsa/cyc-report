/* eslint-disable @typescript-eslint/no-explicit-any */
// This pipe is used to sort an array of unknown objects (hence "any" type) by a specified field and order (ascending or descending).
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortArrays',
  standalone: true,
})
export class SortArrayPipe implements PipeTransform {
  transform(collection: any[] | null, dir: string): any[] | null {
    if (!collection) {
      return null;
    }

    const direction = dir ? dir : 'asc';
    collection.sort((a, b) => {
      const val1: string = a;
      const val2: string = b;
      let sortDir = 0;
      if (direction === 'desc') {
        if (val1 > val2) {
          sortDir = -1;
        }
        if (val1 < val2) {
          sortDir = 1;
        }
      } else {
        // ascending
        if (val1 < val2) {
          sortDir = -1;
        }
        if (val1 > val2) {
          sortDir = 1;
        }
      }
      return sortDir;
    });
    return collection;
  }
}
