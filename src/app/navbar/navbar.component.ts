import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', '../homepage/homepage.page.scss'],
})
export class NavbarComponent implements OnInit {
  token: any;
  user: any = [];
  userstatus;

  constructor(private service: UserService, private router: Router) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.service.getUser().subscribe((data) => {
      this.user = data;
    });
  }

  logOut(){
    console.log("Logged out")
    this.token = null
    localStorage.removeItem('token')
    this.router.navigate(["/login"])
  }
}
