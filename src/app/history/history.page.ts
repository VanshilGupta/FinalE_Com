import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  prevOrders  = []
  orderHis = []
  constructor(private userService : UserService, private route : Router) { }

  ngOnInit() {
    this.userService.getOrders().subscribe(result =>{
      this.prevOrders = result['data']
      console.log(this.prevOrders)
    },error=>{
      console.log("error!")
    })
    this.userService.getHistory().subscribe(result=>{
      this.orderHis = result['data']
      console.log("the ord his is ", this.orderHis)
    })
  }
  navigate(i,j) {
    console.log("The type is",typeof(i),typeof(j))
    let entry = this.orderHis[i]['data'][j]
    console.log(entry)
    let group = entry['group']
    this.route.navigate([`/${group}/product`], {
      queryParams: {
        group: group,
        category: entry['category'],
        id: entry['id'],
      },
    });
  }

}
