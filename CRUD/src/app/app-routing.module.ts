import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewFormComponent } from './add-new-form/add-new-form.component';
import { LoginComponent } from './login/login.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { HomeComponent } from './home/home.component';
import { LazyModule } from './lazy/lazy.module';

// import{LandingpageModule} from './landingpage/LandingpageModule'
const routes: Routes = [
  {
    component:AddNewFormComponent,
    path:'addNewForm'
  },
  {
    component:LoginComponent,
    path:'login'
  },
  // {
  //   component:LandingpageComponent,
  //   path:'propertylist'
  // },
  {
    component:HomeComponent,
    path:'home',
    // loadComponent:()=>import('./app/home/home.component')
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
