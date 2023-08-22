import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingpageComponent } from './landingpage.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { LandingpageRoutingModule } from './landingpage-routing.module';
import { InputTextModule } from 'primeng/inputtext';

// const routes:Routes =[
//   {path:'',component:LandingpageComponent}
// ];
console.log("Landing page module load");
@NgModule({
  declarations: [
    LandingpageComponent,
  ],
  imports: [
    LandingpageRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    InputTextModule
  ]
})
export class LandingpageModule { }
