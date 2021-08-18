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
  user: any = {};


  constructor(private service: UserService, private router: Router) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.user['name'] = localStorage.getItem('name');
    this.user['email'] = localStorage.getItem('email')
  }

  logOut(){
    console.log("Logged out")
    this.token = null
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    this.router.navigate(["/login"])
  }
}
