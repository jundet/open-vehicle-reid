import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, TitleService} from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';
import { NzIconService } from 'ng-zorro-antd';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';

// 自定义服务
import { appSettingsService } from '../services/settings/appSettings.service';
import { APICFG } from '@shared';
import { _HttpClient } from '@delon/theme';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: appSettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: _HttpClient,
    private injector: Injector,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(resolve: any, reject: any) {
    if (this.tokenService.get().token) {
      const appParams = { app: 'ai' };
      const menuParams = { app: 'ai' };
      zip(
        this.httpClient.get(APICFG.MENUCONFIG, menuParams),
      )
        .pipe(
          // 接收其他拦截器后产生的异常消息
          catchError(([menuData]) => {
            resolve(null);
            return [menuData];
          }),
        )
        .subscribe(
          ([menuData]) => {
            // ACL：设置权限为全量
            this.aclService.setFull(true);
            // 初始化菜单
            this.menuService.add(menuData.data);
            // 设置页面标题的后缀
            // this.titleService.suffix = appData.data.name;
            this.titleService.suffix = 'ReID';
          },
          () => { },
          () => {
            resolve(null);
          },
        );
    } else {
      resolve(null);
    }
  }

  private viaMock(resolve: any, reject: any) {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.injector.get(Router).navigateByUrl('/passport/login');
    //   resolve({});
    //   return;
    // }
    // mock
    const app: any = {
      name: `AI`,
      description: `ReID`,
      logoUrl: './assets/app/ai.svg',
      page: 'ai',
    };
    const user: any = {
      name: 'Guest',
      avatar: './assets/logow.png',
      email: 2,
      token: '4f9f5bd037c45eec21e2cbc0a1af1dde847840a0',
    };

    // 用户信息：包括姓名、头像、邮箱地址
    this.settingService.setUser(user);
    // ACL：设置权限为全量
    this.aclService.setFull(true);
    // 初始化菜单
    this.menuService.add([
      {
        text: 'AI',
        group: false,
        autoTitle: false,
        children: [
          {
            text: '实验',
            // link: '/ai',
            icon: { type: 'icon', value: 'appstore' },
            hideInBreadcrumb: true,
            autoTitle: false,
            children: [
              {
                text: '模型',
                link: '/ai/model',
                icon: { type: 'icon', value: 'appstore' },
              },
              {
                text: '卷积计算',
                link: '/ai/conv',
                icon: { type: 'icon', value: 'appstore' },
              },
            ],
          },
        ],
      },
    ]);
    // 设置页面标题的后缀
    this.titleService.suffix = app.name;

    resolve({});
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      // this.viaMock(resolve, reject);
    });
  }
}
