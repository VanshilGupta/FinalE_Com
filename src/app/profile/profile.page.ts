import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = [];
  data={};
  status1;

  constructor(private http:HttpClient, private service: UserService, private router: Router) { }

  ngOnInit() {
    this.service.getUser().subscribe((data) => {
      this.user = data;
      this.user['name']=this.user['name'].toUpperCase();
      console.log(this.user)
     
    });
  }
   update(){
     this.http.post(environment.SERVER_URL +'/user/update',this.data).subscribe((res:any)=>{
      this.status1 = res.status ;
     if (this.status1 == "True"){
      alert("Details Changed Successfully");
    }
    else{
      alert("Error from the server");
    }
     });
   }

}
