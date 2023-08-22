import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from '../landingpage/landingpage.component';
import { AddNewFormComponent } from '../add-new-form/add-new-form.component';
import { LoginComponent } from '../login/login.component';
const routes: Routes = [
    // {path:'login',component:LoginComponent},
    {path:'addNewProperty',component:AddNewFormComponent}
    // path:'propertyList',component:LandingpageComponent,
    // children:[
    // ]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRoutingModule { }
