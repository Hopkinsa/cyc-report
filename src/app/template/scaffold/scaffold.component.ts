import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FileListComponent } from '../../components/filelist/filelist.component';
import { SummaryComponent } from '../../components/summary/summary.component';

@Component({
  selector: 'app-template',
  templateUrl: './scaffold.component.html',
  styleUrls: ['./scaffold.component.scss'],
  imports: [RouterOutlet, HeaderComponent, FileListComponent,  FooterComponent, SummaryComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScaffoldLayoutComponent {}
