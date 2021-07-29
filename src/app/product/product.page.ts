import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  group: string;
  imgPointer = 0;
  personName = 'Vanshil';
  buttonArray = ['SMALL', 'MEDIUM', 'LARGE'];
  id: any;
  data = {};
  category: any;
  token: any;
  constructor(
    private http: HttpClient,
    private activatedroute: ActivatedRoute,
    private service: UserService,
    private router: Router
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
    this.service.addToCart( parseInt(this.id),this.category, this.group)
  }
}
