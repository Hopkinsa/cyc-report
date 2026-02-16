import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SignalService } from '../../core/services';

@Component({
  selector: 'app-report',
  imports: [MatButtonModule, MatTableModule, MatSortModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent {
  private router: Router = inject(Router);
  private _liveAnnouncer = inject(LiveAnnouncer);
  protected signalService: SignalService = inject(SignalService);
  protected readonly displayedColumns: string[] = [
    'file',
    'complexitySum',
    'complexityLevel',
    'details',
  ];

  protected readonly reportData = computed(() => {
    const data = this.signalService.report();
    if (data === null) {
      return [];
    }
    return data;
  });
  readonly sort = viewChild(MatSort);

  protected sortEffect = effect(() => {
    this.dataSource.sort = this.sort();
  });

  dataSource = new MatTableDataSource(this.reportData());

  details(idx: number) {
    this.router.navigate(['/details', idx]);
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
