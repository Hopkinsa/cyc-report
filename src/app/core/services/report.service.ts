import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { httpResource } from '@angular/common/http';

import { SignalService } from './signal.service';
import { CCReport } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  readonly stripPath = import.meta.env.CYC_DIR;

  protected signalService: SignalService = inject(SignalService);

  // Signals only trigger if the new value is different to the current value, to get
  // data pass the data id by using getFiles.set(<id>) or getReport.set(<id>)
  readonly getFiles: WritableSignal<number | null> = signal(null);
  readonly getReport: WritableSignal<string | null> = signal(null);

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

  private reportListRequestResolved = effect(() => {
    if (this.reportList.status() === 'resolved') {
      const processedList = this.processList(this.reportList.value() as string);
      this.signalService.files.set(processedList);
    }
  });

  private reportListRequestError = effect(() => {
    if (this.reportList.error()) {
      console.error('Report List error', this.reportRequest.error()?.message);
    }
  });

  // "public" path translates to root of domain
  private reportList = httpResource.text(() => {
    return this.getFiles() ? '/filelist.csv' : undefined;
  });

  // "public" path translates to root of domain
  private reportRequest = httpResource<CCReport>(() => {
    return this.getReport() ? this.getReport() as string : undefined;
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

  private processList(filelist: string): string[] {
    // Create array from file and remove last entry if empty
    const fileArray = filelist.split('\n');
    if (fileArray[fileArray.length - 1].trim() === '') {
      fileArray.pop();
    }
    return fileArray;
  }
}
