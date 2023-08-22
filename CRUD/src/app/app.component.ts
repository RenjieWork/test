import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewFormComponent } from './add-new-form/add-new-form.component';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CRUD';

  constructor(private _dialog: MatDialog,public _router: Router){

  }
  login(){
    this._dialog.open(LoginComponent);
  }
  openAddNewForm(){
    this._dialog.open(AddNewFormComponent,{
    height: '80%',
    width: '80%',
    data:null});
  }
  landingPage(){
    this._router.navigate(['/propertylist']);
  }
  homePage(){
    this._router.navigate(['/home']);
  }
  aboutPage(){
    this._router.navigate(['/about']);
  }
}
