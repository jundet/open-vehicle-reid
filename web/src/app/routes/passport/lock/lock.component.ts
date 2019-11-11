import { Router } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { appSettingsService, StartupService, LocalStorageService } from '@core';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { APICFG } from '@shared';

@Component({
  selector: 'passport-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.less'],
})
export class UserLockComponent {
  f: FormGroup;

  constructor(
    fb: FormBuilder,
    public settings: appSettingsService,
    private router: Router,
    public msgSrv: NzMessageService,
    private startupSrv: StartupService,
    private localStorageService: LocalStorageService,
    public http: _HttpClient,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    this.f = fb.group({
      password: [null, Validators.required],
    });
  }

  submit() {
    // tslint:disable-next-line:forin
    for (const i in this.f.controls) {
      this.f.controls[i].markAsDirty();
      this.f.controls[i].updateValueAndValidity();
    }
    if (this.f.valid) {
      const loginCfg = {
        userName: this.settings.user.name,
        password: this.f.get('password').value,
      };
      const loginUrl = APICFG.LOGIN_USER;
      this.http.get(loginUrl, loginCfg).subscribe((res: any) => {
        if (res.message !== 'success') {
          this.msgSrv.error('登录失败，请重试！');
          return;
        }
        this.tokenService.set(res.data);
        this.startupSrv.load().then(() => {
          let url = '/';
          if (this.localStorageService.get('nowUrl')) {
            url = this.localStorageService.get('nowUrl');
          }
          this.router.navigateByUrl(url);
        });
      });
    }
  }
}
