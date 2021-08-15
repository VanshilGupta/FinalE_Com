import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  finaloffer;
  constructor(private http:HttpClient, private user : UserService, @Inject(MAT_DIALOG_DATA) data) { 
    this.finaloffer=localStorage.getItem("offer")
    this.data = data;
    this.userCart = data['items']
    this.qty = data['qty']
    console.log(this.qty)
    if(data.dFee == 0) this.DFeeStatement = 'FREE'
    else this.DFeeStatement = '\u20B9'+data.dfee.toString()
   }

  ngOnInit() {
    this.user.getStates().subscribe(data=>{
      this.states = data['data']
    })
  }
  test(v){
      console.log(JSON.stringify(v))
  }

}
