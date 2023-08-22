import { Component, OnInit,Inject, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropertyServicesService } from '../services/property-services.service';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-new-form',
  templateUrl: './add-new-form.component.html',
  styleUrls: ['./add-new-form.component.scss']
})
export class AddNewFormComponent implements OnInit{
    DownPaymentPercent:number = 10;
    DoughnutChartData: any;
    DoughnutChartOpt: any;
    data: any;
    chartOptions: any;
    LoanProgram: any;
    loanTermYears:number[]=[];
    paymentOptions: any;
    Bedrooms: number = 0;
    Bathrooms: number = 0;
    SquareFeet:number=0;
    loanterm:any;
    propertyInfoForm:any;
    fileSelected:any;
    imageUrl:any;
    base64:string="";
    totalPrincipalPay:any;
    totalInterestPay:any;
    totalPayment:any;
    yourMonthlyPayment:any;
    value: number = 50;

    constructor(private _propertyService:PropertyServicesService,
      @Inject(MAT_DIALOG_DATA) public propertyData:any,
      private _dialogRef: MatDialogRef<AddNewFormComponent>){}
    ngOnInit() {
      this.propertyInfoFormInit();
      this.DoughnutChartInit();
      this.chartInit();
      this.loadChart();
    }

    propertyInfoFormInit(){
      this.propertyInfoForm = new FormGroup({
        image: new FormControl('',[Validators.required]),
        address: new FormControl('',[Validators.required]),
        price: new FormControl('',[Validators.required,Validators.min(0)]),
        squarefeet: new FormControl('',[Validators.required,Validators.min(0)]),
        bedroom: new FormControl('',[Validators.required,Validators.min(0)]),
        bathroom: new FormControl('',[Validators.required,Validators.min(0)]),
        downpayment:new FormControl('',[Validators.required,Validators.min(0)]),
        loanamount:new FormControl('',[Validators.required,Validators.min(0)]),
        interestrate:new FormControl('',[Validators.required,Validators.min(0)]),
        loanterm:new FormControl('',[Validators.required,Validators.min(0)]),
      })
    }
    
    downPaymentChange(){
      this.propertyInfoForm.get('loanamount').setValue(this.propertyInfoForm.get('price').value-this.propertyInfoForm.get('downpayment').value);
      this.Amortization_Chart();
    }

    loanAmountChange(){
      this.propertyInfoForm.get('downpayment').setValue(this.propertyInfoForm.get('price').value-this.propertyInfoForm.get('loanamount').value);
      this.Amortization_Chart();
    }

    DoughnutChartInit(){
      this.DoughnutChartOpt = {
        plugins: {
            legend: {
                labels: {
                    color: 'White'
                }
            }
        }
     }
    }

    chartInit(){
      this.chartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            legend: {
                labels: {
                    color:'white'
                }
            }
        },
        scales: {
            x: {
                stacked: false,
                ticks: {
                    color:'#ACAFBA'
                },
                grid: {
                    color: '#27304C',
                    drawBorder: false
                }
            },
            y: {
                stacked: false,
                ticks: {
                    color:'#ACAFBA'
                },
                grid: {
                    color:'#ebedef',
                    drawBorder: false
                }
            }
        }
      };
    }

    onSubmit(){
      if (this.propertyInfoForm.valid) {
        if (this.propertyData) {
          this._propertyService.updateProperty(this.propertyData.id, this.propertyInfoForm.value).subscribe({
            next: (val: any) => {
              this._dialogRef.close('Property Update Successfully');
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }else{
          this._propertyService.addProperty(this.propertyInfoForm.value).subscribe({
            next: (val: any) => {
              this._dialogRef.close('Property Add Successfully');
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }
      }else{
        this.propertyInfoForm.markAllAsTouched();
      }
    }

    onSelectNewFile(event:any):void{
      this.fileSelected = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.fileSelected as Blob);
      reader.onloadend=()=>{
        this.propertyInfoForm.get('image').setValue(reader.result as string);
      }
    }
    
    downPaymentValueChange(e: any){
      this.propertyInfoForm.get('downpayment').setValue(e.value*this.propertyInfoForm.get('price').value/100);
      this.propertyInfoForm.get('loanamount').setValue(this.propertyInfoForm.get('price').value-this.propertyInfoForm.get('downpayment').value);
      this.Amortization_Chart();
    }

    interestRateValueChange(e: any){
      this.propertyInfoForm.get('interestrate').setValue(e.value);
      this.Amortization_Chart();
    }

    monthlyPayment(){
      let p = this.propertyInfoForm.get('loanamount').value;
      let number_month = this.propertyInfoForm.get('loanterm').value*12;
      let monthly_intrest_rate = this.propertyInfoForm.get('interestrate').value/100/12;
      let monthlypay = p * monthly_intrest_rate * (Math.pow(1 + monthly_intrest_rate, number_month)) / (Math.pow(1 + monthly_intrest_rate, number_month) - 1);
      return monthlypay;
    }

    onSelectLoanTerm(e:any){
      this.propertyInfoForm.get('loanterm').setValue(e);
      let stop = e + 2023 - 1;
      let start = 2023;
      this.loanTermYears = Array.from({length:(stop-start)/1+1},(value,index)=>start+index*1);
      this.Amortization_Chart();
    }

    Amortization_Chart(){
      let monthlypay = Number(this.monthlyPayment());
      let number_month = this.propertyInfoForm.get('loanterm').value*12;
      let balance = this.propertyInfoForm.get('loanamount').value;
      let balanceStack = [];
      let principalStack = [];
      let IntrestStack = [];
      let bStack =[];
      let pStack = [];
      let iStack = [];
      let totalStack = [];
      let j = 0;
      let monthly_intrest_rate = this.propertyInfoForm.get('interestrate').value/100/12;
      
      IntrestStack.push(balance*monthly_intrest_rate)
      principalStack.push(monthlypay - IntrestStack[IntrestStack.length-1])
      balanceStack.push(balance-principalStack[principalStack.length-1]);

      for(let i = 1;i<number_month;i++){
          IntrestStack.push(balanceStack[balanceStack.length-1]*monthly_intrest_rate);
          principalStack.push(monthlypay - IntrestStack[IntrestStack.length-1])
          balanceStack.push(balanceStack[balanceStack.length-1]-principalStack[principalStack.length-1])
      }
      
      for(let i = 0;i<number_month;i++){
        j +=1;
        if(j%12 == 0){
          let principalAmount = principalStack.slice(0,i+1).reduce((a,b)=>a+b,0);
          let intrestAmount = IntrestStack.slice(0,i+1).reduce((a,b)=>a+b,0)
          pStack.push(principalAmount);
          iStack.push(intrestAmount);
          bStack.push(balanceStack[i]<0?0:balanceStack[i])
          totalStack.push(principalAmount+intrestAmount)
          j==0;
        }
      }
      this.yourMonthlyPayment=monthlypay.toFixed(2);
      this.totalPrincipalPay=pStack.at(-1)?.toFixed(2);
      this.totalInterestPay=iStack.at(-1)?.toFixed(2);
      this.totalPayment=Number(this.totalInterestPay)+Number(this.totalPrincipalPay);
      this.setChart(bStack,totalStack,pStack,iStack);
      this.setDoughnutChart(pStack,iStack);
      // this.setTable(bStack,totalStack,pStack,iStack);
    }
    
    loadChart(){
      this.propertyInfoForm.patchValue(this.propertyData);
      this.onSelectLoanTerm(this.propertyData?.loanterm);
    }
    test(){
      console.log("testing")
    }

    deleteEmployee(id: number) {
      this._propertyService.deleteProperty(id).subscribe({
        next: (res) => {
          this._dialogRef.close('Property Delete Successfully');
        },
        error: console.log,
      });
    }

    close(){
      this._dialogRef.close(false);
    }

    // setTable(bStack:any,totalStack:any,pStack:any,iStack:any){
    //   for(let i =0;i < this.propertyInfoForm.get('loanterm').value; i++){
    //     this.tableData.push({
    //         year:this.loanTermYears[i],
    //         balance:bStack[i].toFixed(2),
    //         principal:pStack[i].toFixed(2),
    //         interest:iStack[i].toFixed(2),
    //         totalpay:totalStack[i].toFixed(2)
    //     })
    //   }
    // }

    setChart(bStack:any,totalStack:any,pStack:any,iStack:any){
      this.data = {
        labels: this.loanTermYears,
        datasets: [
            {
                type: 'line',
                label: 'Balance',
                backgroundColor: "white",
                data: bStack
            },
            {
              type: 'line',
              label: 'Total Payment',
              backgroundColor: "Yellow",
              data: totalStack
            },
            {
                type: 'bar',
                label: 'Principal Pay',
                backgroundColor: "#FB6589",
                data: pStack
            },
            {
                type: 'bar',
                label: 'Interest Paid',
                backgroundColor: "#3AC8DC",
                data: iStack
            }
        ]
    };
    }

    setDoughnutChart(pStack:any,iStack:any){
      this.DoughnutChartData = {
        labels: ['Principal Amount','Total Interest'],
        datasets: [
            {
                data: [pStack.at(-1), iStack.at(-1)],
                backgroundColor: [
                    "#FB6589",
                    "#26CFE7"
                ],
                hoverBackgroundColor: [
                    "#FB6589",
                    "#26CFE7"
                ]
            }
        ]
      };
    }
}
