import { Component, ChangeDetectionStrategy } from '@angular/core';
import {appSettingsService} from '../../../core/services/settings/appSettings.service';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.less' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  constructor(
    public settings: appSettingsService
    ) {}
}
