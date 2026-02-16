import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CCFunctionComplexity } from '../../core/interfaces';

@Component({
  selector: 'app-file-details',
  imports: [MatButtonModule, MatTableModule, MatSortModule],
  templateUrl: './file-details.component.html',
  styleUrl: './file-details.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileDetailsComponent {
  fileDetails = input<CCFunctionComplexity[]>([]);
  private router: Router = inject(Router);
  private _liveAnnouncer = inject(LiveAnnouncer);
  protected fileData: CCFunctionComplexity[] = [];
  protected readonly displayedColumns: string[] = ['line', 'name', 'complexity'];

  protected dataSource = new MatTableDataSource(this.fileData);

  protected fileDataEffect = effect(() => {
    if (this.fileDetails().length !== 0) {
      this.fileData = this.fileDetails();
      this.dataSource = new MatTableDataSource(this.fileData);
    }
  });

  readonly sort = viewChild(MatSort);

  protected sortEffect = effect(() => {
    this.dataSource.sort = this.sort();
  });

  back(): void {
    this.router.navigate(['/']);
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
