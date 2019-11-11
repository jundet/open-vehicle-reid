import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AiExperimentModelComponent } from './experiment/model/model.component';
import { AiExperimentConvComponent } from './experiment/conv/conv.component';

const routes: Routes = [
  { path: '', redirectTo: 'conv', pathMatch: 'full' },
  // model
  { path: 'model', component: AiExperimentModelComponent },
  { path: 'conv', component: AiExperimentConvComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AiRoutingModule { }
