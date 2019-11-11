import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import { NzModalService } from 'ng-zorro-antd';
import { AiModelTrainingComponent } from './training/training.component';
import { appSettingsService } from '@core';

@Component({
  selector: 'app-ai-experiment-model-train',
  template: '<a (click)="showTrain();">查看</a>',
})
export class TrainRendererComponent implements ICellRendererAngularComp {
  constructor(
    private modalService: NzModalService,
    private appSettings: appSettingsService,
  ) {}
  public params: any;
  userid = this.appSettings.user.id;
  agInit(params: any): void {
    this.params = params;
  }
  public showTrain() {
    const model = this.params.node;
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

  refresh(): boolean {
    return false;
  }
}
