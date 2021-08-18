import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { CreditCardValidators,CreditCard } from 'angular-cc-library';
import { defer } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  providers : [MatDialog],
  encapsulation : ViewEncapsulation.None
})
export class BuyComponent implements OnInit {
  detailsForm:FormGroup
  userCart : any
  qty : any
  data : any
  states: any
  DFeeStatement : string
  shippingDetails  = []
  finaloffer : any
  detailNumber : any
  details:any
  public type$ = defer(() => this.detailsForm.get('creditCard').valueChanges)
  .pipe(map((num: string) => CreditCard.cardType(num)))
  constructor(private http:HttpClient, private user : UserService, 
    private dialogRef : MatDialogRef<BuyComponent>,private _fb:FormBuilder,@Inject(MAT_DIALOG_DATA) data) { 
    this.finaloffer=localStorage.getItem("offer")
    this.data = data;
    this.userCart = data['items']
    this.qty = data['qty']
    console.log(this.qty)
    if(data.dFee == 0) this.DFeeStatement = 'FREE'
    else this.DFeeStatement = '\u20B9'+data.dFee.toString()
   }

  ngOnInit() {
    this.user.getStates().subscribe(data=>{
      this.states = data['data']
    })
    this.user.getCheckoutData().subscribe(result=>{
      if (result['status']) this.shippingDetails = result['data']
    })

    this.detailsForm = this._fb.group({
      address:[''],
      state:[''],
      postalCode:[''],
      sameAdd:[''],
      saveInfo:[''],
      cardType:[''],
      cardName:[''],
      creditCard: ['', [CreditCardValidators.validateCCNumber]],
      expirationDate: ['', [CreditCardValidators.validateExpDate]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]] 
    });
  }
  placeOrder(v){
      this.dialogRef.close(v)
  }
  onSubmit(form) {
    console.log(form);
  }
  change(){
    let index = parseInt(this.detailNumber)
    console.log(typeof(index))
    console.log(index)
    this.details = this.shippingDetails[this.detailNumber]
    this.detailsForm.patchValue(this.details)
  }
  removeCard(i){
    let index = parseInt(i)
    this.shippingDetails.splice(index,1)
    this.user.removeCheckOut(index).subscribe(result=>{
      console.log(result)
    })
  }
}
