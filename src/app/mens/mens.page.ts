import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mens',
  templateUrl: './mens.page.html',
  styleUrls: ['./mens.page.scss'],
})
export class MensPage implements OnInit {
  personName = 'Vanshil';
  mValue: string;
  products = [1, 2, 3, 4, 5, 6, 7, 8];
  group = 'men';
  constructor(
    private service: UserService,
    private ActiveRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.ActiveRoute.queryParams.subscribe((params) => {
      this.mValue = params['category'];
      this.service.getdata2(this.mValue,'men').subscribe((data) => {
        this.products = data['data'];
      });
    });
  }

  addToCart(id) {
    console.log('generated if', id);
    id = parseInt(id);
    this.service.postCart(this.personName, this.mValue, id,'men').subscribe(
      (data) => {
        console.log(data);
        alert('Added');
      },
      (error) => {
        alert(error['error']);
      }
    );
  }
  change(v) {
    this.service.getdata2(v.value,'men').subscribe((data) => {
      this.products = data['data'];
    });
  }
}
