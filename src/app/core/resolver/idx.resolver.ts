import type { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { ReportService, SignalService } from '../services';
import { inject } from '@angular/core';

export const IdxResolver: ResolveFn<number> = (
  route: ActivatedRouteSnapshot,
) => {
  const signalService: SignalService = inject(SignalService);
  const reportService: ReportService = inject(ReportService);
  if (reportService.getReport() === null) {
    reportService.getReport.set('data.json');
  }
  if (signalService.report() === null) {
    reportService.getReport.set('data.json');
  }

  const idx = Number(route.paramMap.get('idx'));
  return idx;
};
