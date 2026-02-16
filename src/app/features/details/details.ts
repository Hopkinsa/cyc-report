import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SignalService } from '../../core/services';
import { FileDetailsComponent } from '../../components/file-details/file-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CCFile } from 'src/app/core/interfaces';

@Component({
  selector: 'app-details',
  imports: [FileDetailsComponent, MatButtonModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Details {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  protected signalService: SignalService = inject(SignalService);

  protected idx = this.route.snapshot.data['idx'];

  protected fileName = "";
  protected readonly fileDetails = computed(() => {
    const details = this.signalService.report()?.filter((item: CCFile) => item.index === this.idx);
    if (details !== null && details !== undefined && details[0].functionComplexities.length > 0) {
      this.fileName = details[0].file;
      return details[0].functionComplexities;
    }
    return [];
  });

    back(): void {
    this.router.navigate(['/']);
  }
}
