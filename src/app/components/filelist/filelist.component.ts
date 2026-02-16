import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ReportService, SignalService } from '../../core/services';
import { SortArrayPipe } from '../../shared/pipes/sort-array.pipe';

@Component({
  selector: 'app-filelist',
  imports: [FormField, SortArrayPipe],
  templateUrl: './filelist.component.html',
  styleUrl: './filelist.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent {
  protected reportService: ReportService = inject(ReportService);
  protected signalService: SignalService = inject(SignalService);

  protected readonly fieldModel = signal<{ file: string }>({ file: '' });
  protected fileForm = form(this.fieldModel);

  selectedFile(): void {
    const file = this.fieldModel().file;
    if (file.trim() !== '') {
      this.reportService.getReport.set(file);
    }
  }
}
