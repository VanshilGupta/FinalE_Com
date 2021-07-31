import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = [];
  data={};

  constructor(private http:HttpClient, private service: UserService, private router: Router) { }

  ngOnInit() {
    this.service.getUser().subscribe((data) => {
      this.user = data;
      this.user['name']=this.user['name'].toUpperCase();
      console.log(this.user)
     
    });
  }
  // update(){
  //   this.http.post('http://127.0.0.1:8000/user/details',this.data).subscribe((data)=>{
  //   alert(data["message"]);
  //   });
  // }

}
