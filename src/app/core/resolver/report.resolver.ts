import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { ReportService } from '../services';

export const ReportResolver: ResolveFn<boolean> = () => {
  const reportService: ReportService = inject(ReportService);

  if (reportService.getFiles() === null) {
    reportService.getFiles.set(Date.now());
  }
  if (reportService.getReport() === null) {
    reportService.getReport.set('data.json');
  }

  return true;
};
