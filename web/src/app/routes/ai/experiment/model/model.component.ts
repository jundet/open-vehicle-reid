import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { appSettingsService } from '@core';
import { APICFG } from '@shared';
import { AiModelTestComponent } from './test/test.component';
import { AiModelTrainingComponent } from './training/training.component';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import {TrainRendererComponent} from './trainRenderer.component';

@Component({
  selector: 'app-ai-experiment-model',
  templateUrl: './model.component.html',
})
export class AiExperimentModelComponent implements OnInit {
  frameworkComponents: {
    trainRenderer: TrainRendererComponent;
  };
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private msg: NzMessageService,
    private appSettings: appSettingsService,
  ) {}
  isVisible = false;
  userid = this.appSettings.user.id;
  height = document.body.offsetHeight - 180;
  scroll = "{x: '1500px', y: '" + this.height + "px'}";
  columnDefs = [
    {headerName: '编号', field: 'id', width: 100, sortable: true},
    {headerName: '模型名称', field: 'model', width: 150, sortable: true},
    {headerName: '数据集', field: 'data', width: 100, sortable: true},
    {headerName: 'Rank1', field: 'rank1', width: 150, sortable: true},
    {headerName: '训练过程', field: 'data', width: 100, sortable: true,
    cellRenderer: 'trainRenderer'},
    {headerName: '测试详情', field: 'data', width: 100, sortable: true,
    cellRenderer: function(params) { return '<a (click)="this.action(1);">查看</a>'; }},
    {headerName: '学习率', field: 'learnrate', width: 100, sortable: true},
    {headerName: '递减步数', field: 'stepsize', width: 100, sortable: true},
    {headerName: '递减率', field: 'gamma', width: 100, sortable: true},
    {headerName: '损失函数', field: 'loss', width: 100, sortable: true},
    {headerName: '图片高度', field: 'height', width: 100, sortable: true},
    {headerName: '图片宽度', field: 'width', width: 100, sortable: true},
    {headerName: '序列长度', field: 'seqlen', width: 100, sortable: true},
    {headerName: 'Batch', field: 'batch', width: 100, sortable: true},
    {headerName: '备注', field: 'other', width: 100, sortable: true},
    {headerName: '时间', field: 'time', width: 100, sortable: true, cellRenderer:  function(params) {const date = new Date(parseInt(params.value)); return date.getFullYear() + '-' + (date.getMonth()+1) + "-" + date.getDate() + " "
    + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(); }},
    {headerName: '操作', field: 'data', width: 100, sortable: true, cellRenderer: function(params) { return '<a onclick="this.action(1);">删除</a>'; }}
];
  
  rowData: any;
  q: any = {
    modelName: '',
    dataset: 'all',
    userid: this.userid,
  };
  models: any = [];
  loading = false;
  datasets = [
    { index: 0, text: '全部', value: 'all', checked: true },
    {
      index: 1,
      text: 'MARS',
      value: 'mars',
      checked: false,
    },
    { index: 2, text: 'iLIDS-VID', value: 'ilidsvid', checked: false },
    { index: 3, text: 'PRID2011', value: 'prid', checked: false },
  ];
  modelName: any;

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '编号',
      width: '100px',
      index: 'id',
      fixed: 'left',
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: '模型名称',
      width: '120px',
      index: 'model',
      sorter: (a: any, b: any) => a.model - b.model,
    },
    {
      title: '数据集',
      width: '100px',
      index: 'data',
      sorter: (a: any, b: any) => a.data - b.data,
    },
    {
      title: 'Rank1',
      width: '80px',
      index: 'rank1',
      sorter: (a: any, b: any) => a.rank1 - b.rank1,
    },
    {
      title: '训练过程',
      width: '100px',
      buttons: [
        { text: '查看', click: (item: any) => this.showTrainModal(item) },
      ],
    },
    {
      title: '测试详情',
      width: '100px',
      buttons: [
        { text: '查看', click: (item: any) => this.showTestModal(item) },
      ],
    },
    { title: '学习率', width: '80px', index: 'learnrate' },
    { title: '递减步数', width: '100px', index: 'stepsize' },
    { title: '递减率', width: '80px', index: 'gamma' },
    { title: '损失函数', width: '100px', index: 'loss' },
    { title: '图片高度', width: '100px', index: 'height' },
    { title: '图片宽度', width: '100px', index: 'width' },
    { title: '序列长度', width: '100px', index: 'seqlen' },
    { title: 'Batch', width: '80px', index: 'batch' },
    { title: '备注', width: '80px', index: 'other' },
    {
      title: '时间',
      type: 'date',
      width: '100px',
      index: 'time',
      sorter: (a: any, b: any) => a.time - b.time,
    },
    {
      title: '操作',
      width: '80px',
      buttons: [
        { text: '删除', click: (item: any) => this.showDelModal(item) },
      ],
    },
  ];

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.loading = true;
    const modelUrl = APICFG.MLMODEL;
    this.http
      .get(modelUrl, this.q)
      .pipe(tap(() => (this.loading = false)))
      .subscribe((res: any) => {
        if (res.message !== 'success') {
          this.msg.error(`获取实验数据失败！`);
          return;
        }
        this.models = res.data;
        this.rowData = res.data;
        this.cdr.detectChanges();
      });
  }

  showTrainModal(model: any): void {
    this.modalService.create({
      nzContent: AiModelTrainingComponent,
      nzFooter: null,
      nzWidth: 800,
      nzComponentParams: {
        modelId: model.id,
        userId: this.userid,
        modelName: model.model,
      },
    });
  }

  showTestModal(model: any): void {
    this.modalService.create({
      nzContent: AiModelTestComponent,
      nzFooter: null,
      nzWidth: 1000,
      nzBodyStyle: {},
      nzComponentParams: {
        modelId: model.id,
        userId: this.userid,
        modelName: model.model,
      },
    });
  }

  showDelModal(model: any): void {
    const qu = {
      modelId: model.id,
      userId: this.userid
    };
    this.modalService.confirm({
      nzTitle: '确定删除{{model.model}}?',
      nzContent:
        '<b style="color: red;">将删除该次实验的所有数据，包括训练数据和测试数据。数据不可恢复！</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.loading = true;
        const modelUrl = APICFG.MLDElETE;
        this.http
          .get(modelUrl, qu)
          .pipe(tap(() => (this.loading = false)))
          .subscribe((res: any) => {
            if (res.message !== 'success') {
              this.msg.error(`删除失败！`);
              return;
            }
            this.msg.success(`删除成功！`);
            this.getData();
          });
      },
      nzCancelText: '取消',
      nzOnCancel: () => {},
    });
  }

  reset() {
    this.q = {
      modelName: '',
      dataset: 'all',
      userid: this.userid,
    };
    this.getData();
  }
}
