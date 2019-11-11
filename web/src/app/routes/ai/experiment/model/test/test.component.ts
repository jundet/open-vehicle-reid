import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { tap, map } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { APICFG } from '@shared';
import { STColumn, STPage } from '@delon/abc';

@Component({
  selector: 'app-ai-model-test',
  templateUrl: './test.component.html',
})
export class AiModelTestComponent implements OnInit {
  modelId: any;
  userId: any;
  modelName: any = '';
  testData: any[];
  loading = false;
  url = APICFG.MLTEST;
  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  testColumns: STColumn[] = [
    {
      title: '编号',
      width: '50px',
      index: 'id',
    },
    {
      title: '模型编号',
      width: '100px',
      index: 'modelid',
    },
    {
      title: 'epoch',
      width: '80px',
      index: 'epoch',
      fixed: 'left',
      sorter: (a: any, b: any) => a.epoch - b.epoch,
    },
    {
      title: 'mAP',
      width: '80px',
      index: 'map',
      sorter: (a: any, b: any) => a.map - b.map,
    },
    {
      title: 'rank1',
      width: '80px',
      index: 'rank1',
      sorter: (a: any, b: any) => a.rank1 - b.rank1,
    },
    {
      title: 'rank5',
      width: '80px',
      index: 'rank5',
      sorter: (a: any, b: any) => a.rank5 - b.rank5,
    },
    {
      title: 'rank10',
      width: '80px',
      index: 'rank10',
      sorter: (a: any, b: any) => a.rank10 - b.rank10,
    },
    {
      title: 'rank20',
      width: '80px',
      index: 'rank20',
      sorter: (a: any, b: any) => a.rank20 - b.rank20,
    },
  ];
  testPage: STPage = {
    show: false,
  };
  ngOnInit(): void {
    this.loading = true;
    this.http.get(this.url, { modelId: this.modelId, userId: this.userId })
      .pipe(tap(() => (this.loading = false))).
      subscribe((res: any) => {
      if (res.message !== 'success') {
        this.msgSrv.error('获取测试数据失败，请稍后重试！');
        return;
      }
      this.testData = res.data;
      this.cdr.detectChanges();
    });
  }

  close() {
    this.modal.destroy();
  }
}
