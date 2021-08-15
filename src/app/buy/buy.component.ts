import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  providers : [MatDialog],
  encapsulation : ViewEncapsulation.None
})
export class BuyComponent implements OnInit {
  userCart : any
  qty : any
  data : any
  states: any
  DFeeStatement : string
  constructor(private http:HttpClient, private user : UserService,
    private dialogRef : MatDialogRef<BuyComponent> , @Inject(MAT_DIALOG_DATA) data) { 
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
  }
  placeOrder(v){
      this.dialogRef.close(JSON.stringify(v))
  }

}
