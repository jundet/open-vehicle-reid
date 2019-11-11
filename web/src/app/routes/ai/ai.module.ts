import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AiRoutingModule } from './ai-routing.module';
import { AiExperimentModelComponent } from './experiment/model/model.component';
import { AiExperimentConvComponent } from './experiment/conv/conv.component';
import { AiModelTestComponent } from './experiment/model/test/test.component';
import { AiModelTrainingComponent } from './experiment/model/training/training.component';
import { TrainRendererComponent } from './experiment/model/trainRenderer.component';

import { ViserModule } from 'viser-ng'; // G2
import { NgxEchartsModule } from 'ngx-echarts'; // echarts
import { HighlightJsModule } from 'ngx-highlight-js';
import { AgGridModule } from 'ag-grid-angular';

const COMPONENTS = [
  AiExperimentModelComponent,
  AiExperimentConvComponent,
];
const COMPONENTS_NOROUNT = [
  AiModelTestComponent,
  AiModelTrainingComponent,
  TrainRendererComponent];

@NgModule({
  imports: [
    ViserModule,
    HighlightJsModule,
    NgxEchartsModule,
    SharedModule,
    AgGridModule.withComponents([TrainRendererComponent]),
    AiRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class AiModule { }
