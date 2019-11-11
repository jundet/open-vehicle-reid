import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appSettingsService } from '@core';
import { MenuService } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'header-icon',
  templateUrl: './icon.component.html',
  styles: [],
})
export class HeaderIconComponent implements OnInit {
  // loading = true;
  icons = [
  ];
  constructor(
    private router: Router,
    private settings: appSettingsService,
    private menuService: MenuService,
    private modalService: NzModalService,
  ) {}

  ngOnInit() {}
  moduleChange(icon) {
    if (icon.pageUrl) {
      window.open(icon.pageUrl, '_blank');
    } else if (icon.name === 'About') {
      this.showTrainModal();
    }
  }
  showTrainModal(): void {
    this.modalService.create({
      nzContent: AboutComponent,
      nzFooter: null,
      nzWidth: 900,
    });
  }
}
