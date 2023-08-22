import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { AddNewFormComponent } from './add-new-form/add-new-form.component';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ButtonModule } from 'primeng/button';
import {ChartModule} from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { HttpClientModule } from '@angular/common/http';
import { ObserversModule } from '@angular/cdk/observers';
import { KeyFilterModule } from 'primeng/keyfilter';
import {MatSliderModule} from '@angular/material/slider';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNewFormComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonModule,
    ChartModule,
    InputTextModule,
    SliderModule,
    DropdownModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    SelectButtonModule,
    HttpClientModule,
    ObserversModule,
    KeyFilterModule,
    MatSliderModule,
    MessageModule,
    MessagesModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
