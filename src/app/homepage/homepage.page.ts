import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  womenswear=[];

  constructor(private http:HttpClient) { 
    this.http.get('http://127.0.0.1:8000/ecomapp/home').subscribe((result:any)=>{
      this.womenswear=result.wears;
      console.log(this.womenswear);

    })
  }

  ngOnInit() {
  }

}
