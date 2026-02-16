import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { httpResource } from '@angular/common/http';

import { SignalService } from './signal.service';
import { CCReport } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  readonly stripPath = '/Users/andyhopkins/Development/frontend-platform/apps/scram/src/';

  protected signalService: SignalService = inject(SignalService);

  // Signals only trigger if the new value is different to current value
  // to get a recipe pass the recipe id by using getRecipe.set(<id>)
  readonly getReport: WritableSignal<number | null> = signal(null);

  private reportRequestResolved = effect(() => {
    if (this.reportRequest.status() === 'resolved') {
      const processedReport = this.processReport(this.reportRequest.value() as CCReport);
      this.signalService.report.set(processedReport);
    }
  });

  private reportRequestError = effect(() => {
    if (this.reportRequest.error()) {
      console.error('Report error', this.reportRequest.error()?.message);
    }
  });

  // "public" path translates to root of domain
  private reportRequest = httpResource<CCReport>(() => {
    return this.getReport() ? '/data.json' : undefined;
  });

  private processReport(report: CCReport): CCReport {
    // Reduce the file path to make the report more readable
    // Filter out files not in the 'app' directory as these are not relevant
    let index = 0;
    report.forEach((item) => {
      item.index = index;
      item.file = item.file.replace(this.stripPath, '');
      index++;
    });
    const filterReport = report.filter((item) => item.file.includes('app/'));
    return filterReport;
  }
}
