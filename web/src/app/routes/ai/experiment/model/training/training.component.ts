import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { tap, map } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { APICFG } from '@shared';
import { STColumn, STPage } from '@delon/abc';


const DataSet = require('@antv/data-set');

interface traindata {
  id?: any;
  modellid?: any;
  epoch?: any;
  loss?: any;
  acc?: any;
}

@Component({
  selector: 'app-ai-model-training',
  templateUrl: './training.component.html',
})
export class AiModelTrainingComponent implements OnInit {
  modelId: number;
  userId: number;
  modelName: any = '';
  trainData: any[];
  url = APICFG.MLTRAIN;
  loading = false;
  // g2配置
  forceFit: boolean = true;
  height: number = 400;
  data: any;
  scale: any;
  // g2 end

  option: any;
  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}
  record: any = {};
  i: any;
  trainColumns: STColumn[] = [
    {
      title: '编号',
      width: '50px',
      index: 'id',
    },
    {
      title: '模型编号',
      width: '50px',
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
      title: 'loss',
      width: '80px',
      index: 'loss',
    },
    {
      title: 'acc',
      width: '80px',
      index: 'acc'
    },
  ];
  trainPage: STPage = {
    show: false,
  };

  ngOnInit(): void {
    this.loading = true;
    this.http.get(this.url, { modelId: this.modelId, userId: this.userId })
    .pipe(tap(() => (this.loading = false)))
    .subscribe((res: any) => {
      if (res.message !== 'success') {
        this.msgSrv.error('获取训练数据失败，请稍后重试！');
        return;
      }
      this.trainData = res.data;
      this.g2line(res.data);
      this.eline(res.data);
      this.cdr.detectChanges();
    });
  }
  close() {
    this.modal.destroy();
  }

  g2line(dataset: traindata[]) {
    for (let lossdata of dataset) {
      lossdata.loss = parseFloat(lossdata.loss);
      lossdata.epoch = parseInt(lossdata.epoch);
    }
    const dv = new DataSet.View().source(dataset);
    dv.transform({
      type: 'fold',
      fields: ['loss'],
      key: 'value',
      value: 'loss',
    });
    this.data = dv.rows;
    this.scale = [ {
      dataKey: 'epoch',
      min: 0,
    }];
  }

  eline(dataset: any) {
    let xAxisData = [];
    let seriesData = [];
    for(let element of dataset){
      xAxisData.push(element.epoch);
      seriesData.push(element.loss);
    }

    this.option = {
      title: {
        text: '训练过程'
      },
      legend: {
        data: ['loss']
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {
            readOnly: false
          },
          saveAsImage: {
            show: true
          },
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          return params[0].name + ' : ' + params[0].value;
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: [{
        type: 'category',
        data: xAxisData
      }],
      yAxis: [{
        type: 'value'
      }],
      dataZoom: [{
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'empty'
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        filterMode: 'empty'
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'empty'
      },
      {
        type: 'inside',
        yAxisIndex: 0,
        filterMode: 'empty'
      }
      ],
      series: [{
        name: "loss",
        data: seriesData,
        type: 'line'
      }]
    };
  }
}
