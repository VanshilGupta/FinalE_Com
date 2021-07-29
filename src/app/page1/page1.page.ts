import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.page.html',
  styleUrls: ['./page1.page.scss'],
})
export class Page1Page implements OnInit {
  users=[];
  todo = {};
  constructor(private http: HttpClient,private User : UserService,private route : Router) {
  //    this.http.get('https://www.autonise.com/api/course/catalog/').subscribe((result:any) =>{
  //   console.log(result);
  //  })
   }

  ngOnInit() {
  }
  email:any;
  failedMsg : string;
  password:any;

  login(form,e){
  
    if(e.keyCode == 13 || e.keyCode == undefined){
      if(!form.invalid){
        this.User.login(this.todo).subscribe(data=>{
          localStorage.setItem('token',data['token'])
          alert("Login Successful")
          this.route.navigate(["/homepage"])
        },error=>{
          this.failedMsg = error['error']
        })
      }
    }

  }

}
