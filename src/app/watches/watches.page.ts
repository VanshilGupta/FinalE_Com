import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-watches',
  templateUrl: './watches.page.html',
  styleUrls: ['./watches.page.scss'],
})
export class WatchesPage implements OnInit {

  personName = 'Vanshil';
  mValue: string;
  products = [1, 2, 3, 4, 5, 6, 7, 8];
  group = 'watches';
  constructor(
    private service: UserService,
    private ActiveRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.ActiveRoute.queryParams.subscribe((params) => {
      this.mValue = params['category'];
      if(this.mValue == undefined){
        this.mValue = 'ANALOUGE'
      }
      this.service.getdata2(this.mValue,this.group).subscribe((data) => {
        this.products = data['data'];
      });
    });
  }

  addToCart(id) {
    id = parseInt(id);
    this.service.addToCart(id,this.mValue,this.group)
  }
  change(v) {
    this.service.getdata2(v.value,this.group).subscribe((data) => {
      this.products = data['data'];
    });
  }

}
