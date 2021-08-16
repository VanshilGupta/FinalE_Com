import { AUTO_STYLE } from '@angular/animations';
import { JsonPipe } from '@angular/common';
import { Conditional } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BuyComponent } from '../buy/buy.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartPage implements OnInit {
  emptyCartSentence = '';
  class1 = {
    'text-danger': false,
  };
  tooltipStatement: string;
  infoText: string;
  DFee: number;
  DFeeStatement: string;
  x = 0;
  TotalMRP: number = 0;
  totalPrice: number = 0;
  qty = [];
  name: string;
  userCart = [];
  catAindex = [];
  NumberItems: number;
  finaloffer;

  constructor(
    private service: UserService,
    private route: Router,
    private dialog: MatDialog
  ) {
    this.finaloffer = localStorage.getItem('offer');
  }
  ngOnInit() {
    this.service.getUser().subscribe((data) => {
      this.name = data['name'];
    });
    this.service.getUserCart(this.name).subscribe((data) => {
      this.catAindex = data['data'];
      if (this.x == 0) {
        this.catAindex.forEach((element) => {
          this.qty.push(element['qty']);
        });
      }
      this.x = 1;

      this.service.getDetailedCart(this.name).subscribe((data) => {
        this.userCart = data['data'];
        if (this.userCart.length == 0) this.updateSentence();
        else this.emptyCartSentence = '';
        this.updateAll();
      });
    },error=>{
      this.updateSentence()
    });

    // this.catAindex.forEach((element) => {
    //   console.log("Element is : ", element)
    //   this.service.getdata2(element['category']).subscribe((data2) => {
    //     let entry : object= data2['data'][element['id']]
    //     console.log("Entry is :", entry)
    //     this.userCart.push(entry);
    //     console.log(this.userCart)
    //     this.qty.push(1)
    //   });
    // });

    // for(let i : number =0 ; i<this.catAindex.length;i++){

    //   console.log("Executed")
    //   console.log(this.userCart)
    //   let entry : any
    //   console.log(this.catAindex[i])
    //   console.log("Main index is " , i)
    //   this.service.getdata2(this.catAindex[i]["category"]).subscribe(data2 => {
    //     console.log("helloooo")
    //     entry = data2['data']
    //     this.userCart.push(entry[this.catAindex[i]["id"]])
    //     // console.log("index is ", i)
    //     // console.log(data2['data'][this.catAindex[i]["id"]])
    //     // this.userCart.push(data2['data'][this.catAindex[i]["id"]])
    //   })
    // }
  }

  updateAll() {
    console.log('Hello all');
    this.updateTotalItems();
    this.updatePrice();
    this.updateMRP();
    this.updateTooltip();
    this.updateDfee();
  }

  navigate(index, name) {
    let group = this.catAindex[index]['group'];
    console.log(index, name);
    this.route.navigate([`/${group}/product`], {
      queryParams: {
        group: group,
        category: this.catAindex[index]['category'],
        name: name,
        id: this.catAindex[index]['id'],
      },
    });
  }

  updateSentence() {
    console.log('updatinggg');
    console.log('the empty sentence is ', this.emptyCartSentence);
    let str = "The cart feels so light, Let's add some items.";
    var i = 0;
    var handle = setInterval(() => {
      this.emptyCartSentence += str[i];
      i++;
      if (i >= str.length) clearInterval(handle);
    }, 50);
  }
  updateTotalItems() {
    console.log('hey number items');
    this.NumberItems = this.qty.reduce((a, b) => a + b, 0);
  }

  updateTooltip() {
    console.log('heu tooltip');
    this.tooltipStatement =
      'Add products worth ' +
      '\u20B9' +
      (1000 - this.totalPrice).toString() +
      ' more for free delivery';
  }

  updateDfee() {
    console.log('hey discount');
    if (this.totalPrice < 1000) {
      this.class1['text-danger'] = true;
      this.DFee = 49;
      this.DFeeStatement = '\u20B9' + this.DFee.toString();
    } else {
      this.DFee = 0;
      this.DFeeStatement = 'FREE';
      this.class1['text-danger'] = false;
    }
  }

  updatePrice() {
    console.log('PRice updatedd!!');
    this.totalPrice = 0;
    for (let i = 0; i < this.catAindex.length; i++) {
      this.totalPrice += this.qty[i] * this.userCart[i]['price'];
    }
  }
  // test(index, value) {
  //   console.log(value);
  //   let i = parseInt(index);
  //   console.log(this.qty[i]);
  //   if (this.qty[i] != value) {
  //     console.log('changed');
  //   }
  //   this.totalPrice += (value - this.qty[i]) * this.userCart[index]['price'];
  //   console.log(this.totalPrice);
  // }

  updateMRP() {
    console.log('MRP updated');
    this.TotalMRP = 0;
    for (let i = 0; i < this.catAindex.length; i++) {
      let item = this.userCart[i];
      this.TotalMRP +=
        (100 / (100 - item['offer'])) * item['price'] * this.qty[i];
    }
  }

  updateQty(index) {
    console.log(this.totalPrice);
    let but = document.getElementById('ok' + index.toString());
    but.style.display = 'inline';
    this.updateAll();
  }

  dissapear(index) {
    let i = parseInt(index);
    this.service.updateQty(this.name, i, this.qty[index]).subscribe((data) => {
      console.log(data);
    });
    document.getElementById('ok' + index.toString()).style.display = 'none';
  }

  remove(index) {
    let i = parseInt(index);
    this.service.removeCart(this.name, i).subscribe((data) => {
      console.log(data);
      this.updateOnRemove(i);
      if (this.catAindex.length == 0) this.updateSentence();
    });
  }
  updateOnRemove(index) {
    this.qty.splice(index, 1);
    this.userCart.splice(index, 1);
    this.catAindex.splice(index, 1);
    this.updateAll();
  }
  buy() {
    let dialogRef = this.dialog.open(BuyComponent, {
      disableClose: true,
      autoFocus: true,
      panelClass: ['my-dialog', 'full-screen-modal'],
      data: {
        items: this.userCart,
        qty: this.qty,
        mrp: this.TotalMRP,
        total: this.totalPrice,
        dFee: this.DFee,
        totalItems: this.NumberItems,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The result is",result);
      if (result['saveInfo'] == true) {
        console.log('save info is here');
        this.service.checkOut(result).subscribe((result2) => {
          console.log(result2);
        });
      }
      this.userCart = [];
      this.catAindex = [];
      this.updateSentence();
    });
  }
}
