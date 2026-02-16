import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SignalService } from '../../core/services';
import { ReportComponent } from '../../components/report/report.component';

@Component({
  selector: 'app-viewer',
  imports: [ReportComponent],
  templateUrl: './viewer.html',
  styleUrl: './viewer.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Viewer {
  protected signalService: SignalService = inject(SignalService);
}
