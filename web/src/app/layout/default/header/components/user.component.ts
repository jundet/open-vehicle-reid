import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

import { appSettingsService, LocalStorageService } from '@core';

@Component({
  selector: 'header-user',
  template: `
    <nz-dropdown nzPlacement="bottomRight">
      <div
        class="alain-default__nav-item d-flex align-items-center px-sm"
        nz-dropdown
      >
        <nz-avatar
          [nzSrc]="settings.user.avatar"
          nzSize="small"
          class="mr-sm"
        ></nz-avatar>
        {{ settings.user.name }}
      </div>
      <div nz-menu class="width-sm">
        <div nz-menu-item routerLink="/pro/account/center">
          <i nz-icon type="user" class="mr-sm"></i>
          个人中心
        </div>
        <div nz-menu-item routerLink="/pro/account/settings">
          <i nz-icon type="setting" class="mr-sm"></i>
          个人设置
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon type="logout" class="mr-sm"></i>
          退出登录
        </div>
        <div nz-menu-item (click)="lock()">
          <i nz-icon type="lock" class="mr-sm"></i>
          锁屏
        </div>
      </div>
    </nz-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {
  constructor(
    public settings: appSettingsService,
    private router: Router,
    private localStorageService: LocalStorageService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  logout() {
    this.tokenService.clear();
    this.settings.userclear();
    this.router.navigateByUrl(this.tokenService.login_url);
  }

  lock() {
    this.router.navigateByUrl('passport/lock');
    this.localStorageService.set('nowUrl', this.router.url);
  }
}
