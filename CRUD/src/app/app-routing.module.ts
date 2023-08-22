import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewFormComponent } from './add-new-form/add-new-form.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    component:AddNewFormComponent,
    path:'addNewForm'
  },
  {
    component:LoginComponent,
    path:'login'
  },
  {
    component:HomeComponent,
    path:'home',
  },
  { path: 'about', 
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path:'propertylist',
    loadChildren:()=>import('./landingpage/landingpage.module').then(mod=>mod.LandingpageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
