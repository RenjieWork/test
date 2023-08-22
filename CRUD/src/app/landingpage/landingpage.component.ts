import { Component,OnInit } from '@angular/core';
import { PropertyServicesService } from '../services/property-services.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewFormComponent } from '../add-new-form/add-new-form.component';
import { FormGroup, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit{
  products:any;
  layout: string = 'list';
  numberOfBathroomOption:any;
  numberOfBedroomOption:any;
  filterForm:any;
  rangeValues: number[] = [20, 80];
  constructor(private _propertyService:PropertyServicesService,
              private _dialog: MatDialog,
              private _snackBar: MatSnackBar) {}
  ngOnInit() {
    this.getPropertyList();
    this.filterFormInit();
    this.filterDropDown();
  }

  filterFormInit(){
    this.filterForm = new FormGroup({
      numBathRoom: new FormControl(''),
      numBedRoom: new FormControl(''),
      squareFeetMin: new FormControl(''),
      squareFeetMax: new FormControl(''),
      priceMin: new FormControl(''),
      priceMax: new FormControl(''),
      address:new FormControl('')
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'ok', {
      duration: 6000,
      verticalPosition: 'top',
    });
}

  getPropertyList() {
    this._propertyService.getPropertyList().subscribe({
      next: (res) => {
         this.products=JSON.parse(JSON.stringify(res));
      },
      error: console.log,
    });
  }

  goPropertyDetail(data:any){
    const dialogRef = this._dialog.open(AddNewFormComponent,{
      height: '90%',
      width: '90%',
     data});
     dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getPropertyList();
        if(val)this.openSnackBar(val);
      },
    });
  }

  filter(){
    this.getPropertyList();
    setTimeout(() => {
      this.filterProperty()
  }, 100);
  }

  filterProperty(){
    if(this.filterForm.get('address').value){
      this.products = this.products.filter((item:any)=>item.address.includes(this.filterForm.get('address').value))
    }
    if(this.filterForm.get('numBedRoom').value){
      this.products = this.products.filter((item:any)=>item.bedroom >= this.filterForm.get('numBedRoom').value)
    }
    if(this.filterForm.get('numBathRoom').value){
      this.products = this.products.filter((item:any)=>item.bathroom >= this.filterForm.get('numBathRoom').value)
    }
    if(this.filterForm.get('squareFeetMin').value){
      this.products = this.products.filter((item:any)=>item.squarefeet >= this.filterForm.get('squareFeetMin').value)
    }
    if(this.filterForm.get('squareFeetMax').value){
      this.products = this.products.filter((item:any)=>item.squarefeet <= this.filterForm.get('squareFeetMax').value)
    }
    if(this.filterForm.get('priceMin').value){
      this.products = this.products.filter((item:any)=>item.price >= this.filterForm.get('priceMin').value)
    }
    if(this.filterForm.get('priceMax').value){
      this.products = this.products.filter((item:any)=>item.price <= this.filterForm.get('priceMax').value)
    }
  }

  filterDropDown(){  
    this.numberOfBedroomOption = [
      { name: '1+ Bedroom', code: '1' },
      { name: '2+ Bedroom', code: '2' },
      { name: '3+ Bedroom', code: '3' },
      { name: '4+ Bedroom', code: '4' },
      { name: '5+ Bedroom', code: '5' }
  ];

  this.numberOfBathroomOption = [
    { name: '1+ Bathroom', code: '1' },
    { name: '2+ Bathroom', code: '2' },
    { name: '3+ Bathroom', code: '3' },
    { name: '4+ Bathroom', code: '4' },
    { name: '5+ Bathroom', code: '5' }
  ];
  }
}
