import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
import { MatDialog } from '@angular/material/dialog';
import { BuyComponent } from '../buy/buy.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  group: string;
  imgPointer = 0;
  buttonArray = ['SMALL', 'MEDIUM', 'LARGE'];
  id: any;
  data = {};
  category: any;
  token: any;
  dfee: number;
  constructor(
    private http: HttpClient,
    private activatedroute: ActivatedRoute,
    private service: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.activatedroute.queryParams.subscribe((params) => {
      this.group = params['group'];
      this.id = params['id'];
      this.category = params['category'];
    });
    this.service.getdata2(this.category, this.group).subscribe((data) => {
      this.data = data['data'][this.id];
      if (this.data['price'] > 1000) this.dfee = 0;
      else this.dfee = 49;
    });
  }

  change(index, src) {
    this.data['src'] = src;
    document
      .getElementById(this.imgPointer.toString())
      .classList.remove('side_viewF');
    this.imgPointer = index;
    document.getElementById(index).classList.add('side_viewF');
  }
  // border(){
  //   let img = document.getElementById("view")
  //   console.log(img)

  //   img.className += "side_viewF"

  // }
  addToCart() {
    this.service.addToCart(parseInt(this.id), this.category, this.group);
  }
  buy() {
    console.log('here it goes');
    let dialogRef = this.dialog.open(BuyComponent, {
      disableClose: true,
      autoFocus: true,
      panelClass: ['my-dialog', 'full-screen-modal'],
      data: {
        items: this.data,
        qty: 1,
        mrp: this.data['price'] / (1 - this.data['offer'] / 100),
        total: this.data['price'],
        dFee: this.dfee,
        totalItems: 1,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The result is', result);
      if (result['saveInfo'] == true) {
        console.log('save info is here');
        this.service.checkOut(result).subscribe((result2) => {
          console.log(result2);
        });
      }
      if (result != 'false') {
        console.log('order placeddd!');
        this.service
          .orderPlaced(this.data['price'] + this.dfee, true, {
            group: this.group,
            category: this.category,
            id: parseInt(this.id),
            qty: 1,
          })
          .subscribe((result) => {
            alert('Order placed successfully');
            console.log('Order is placed', result);
          });
      }
    });
  }
}
