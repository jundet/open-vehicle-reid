import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TitleService } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';
import { appSettingsService } from '@core';


@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private titleSrv: TitleService,
    private modalSrv: NzModalService,
    private SettingSrv: appSettingsService,
  ) {
    renderer.setAttribute(
      el.nativeElement,
      'ReID',
      'V1.0',
    );
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => {
        const title = 'AI' || 'ReID';
        this.titleSrv.setTitle(title);
        this.modalSrv.closeAll();
      });
  }
}
