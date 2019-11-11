import {Injectable,Injector } from '@angular/core';
import { zip} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MenuService, MenuIcon } from '@delon/theme';
import { appSettingsService } from '@core';

@Injectable({
  providedIn: 'root',
})
export class AppMenuService {
  constructor(
    private httpClient: HttpClient,
    private injector: Injector,
    private menuService: MenuService,
    private settingService: appSettingsService,
  ) {}
  icons = [
    { name: 'AI', logoUrl: './assets/app/ai.svg', page: '', description: '' },
  ];

  menus: any = [
    {
      text: '实验平台',
      group: false,
      children: [
        {
          text: '地图',
          link: 'gis/baidumap',
          icon: { type: 'icon', value: 'appstore' },
        },
        {
          text: '快捷菜单',
          icon: { type: 'icon', value: 'rocket' },
          shortcutRoot: true,
        },
      ],
    },
  ];

  private getByRoute(): string {
    let next = this.injector.get(ActivatedRoute);
    while (next.firstChild) next = next.firstChild;
    const data = (next.snapshot && next.snapshot.data) || {};
    return data.title;
  }

  private getByMenu(): string {
    const menus = this.menuService.getPathByUrl(this.injector.get(Router).url);
    if (!menus || menus.length <= 0) return '';

    const item = menus[menus.length - 1];
    return item.text;
  }

  getMenusbyUrl(menusid?: string) {
    const menusUrl = '' + menusid;
    zip(this.httpClient.get(menusUrl))
      .pipe(
        // 接收其他拦截器后产生的异常消息
        catchError(([menusData]) => {
          return [menusData];
        }),
      )
      .subscribe(
        ([menusData]) => {
          this.menuService.clear();
          this.menuService.add(this.menus);
        },
        () => {},
        () => {},
      );
  }

  setMenus() {
    let Menu = this.getByMenu();
    let Route = this.getByRoute();

    // 侧边栏顶部APP名称与icon修改
    // this.settingService.setAppModule(this.icons[1]);
    // 侧边菜单栏更新
    this.menuService.clear();
    this.menuService.add(this.menus);
  }
}
