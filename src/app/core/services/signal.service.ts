import { Injectable, signal, computed, WritableSignal } from '@angular/core';

import { CCReport } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  // Signals that contains the Recipe data
  readonly report: WritableSignal<CCReport | null> = signal(null);

  readonly numberOfFiles = computed(() => {
    if (this.report() !== null) {
      return this.report()!.length;
    }
    return 0;
  });

  readonly averageComplexity = computed(() => {
    if (this.report() !== null && this.numberOfFiles() > 0) {
      const avg =
        this.report()!.reduce((acc, item) => acc + item.complexitySum, 0) / this.numberOfFiles();
      return avg.toFixed(2);
    }
    return 0;
  });
}
