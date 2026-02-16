import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SignalService } from '../../core/services';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  protected signalService: SignalService = inject(SignalService);
}
