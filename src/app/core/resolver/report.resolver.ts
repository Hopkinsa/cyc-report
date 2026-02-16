import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { ReportService } from '../services';

export const ReportResolver: ResolveFn<boolean> = () => {
  const reportService: ReportService = inject(ReportService);
  reportService.getReport.set(Date.now());
  return true;
};
