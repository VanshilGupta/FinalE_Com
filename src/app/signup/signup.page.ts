import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('myEmail') inputEmail;
  @ViewChild('myName') inputName;
  @ViewChild('myNumber') inputNumber;
  @ViewChild('myPassword') inputPassword;
  numberBool = false;
  passwordBool = false;
  emailBool = false;
  users = [];
  todo = {};
  clickBool = false;
  constructor(private http: HttpClient, private user: UserService,private route : Router, private snackBar : MatSnackBar) {}

  ngOnInit(): void {
    // this.user=this.userinfo.getdata()
  }

  submit(f,e){
    console.log(e.keyCode)
    this.clickBool = true
    this.login(f,e)
  }

  login(form, e) {
    console.log(e.keyCode)
    if (e.keyCode == 13 || this.clickBool ) {
      if (!form.invalid) {
        this.user.register(this.todo).subscribe(
          data => {
            console.log("reg success",data)
            this.route.navigate(["/login"])
            this.snackBar.open('Registration Successfull','Dismiss',{
              horizontalPosition : 'end',
              verticalPosition : 'top',
              duration : 3000,
              panelClass : 'custom-class'
            })
          },
          error => {
            console.log("Reg unsucess",error)
            this.snackBar.open(error['error'],'Dismiss',{
              horizontalPosition : 'end',
              verticalPosition : 'top',
              duration : 3000,
              panelClass : 'custom-class2'
            })
          }
        );
      } else {
        if (!this.todo['name']) {
          this.inputName.setFocus();
        } else if (!this.todo['email']) {
          this.inputEmail.setFocus();
        } else if (!this.todo['number']) {
          this.inputNumber.setFocus();
        } else if (!this.todo['pass']) {
          this.inputPassword.setFocus();
        }
        if (this.todo['email']) {
          if (!this.emailBool){
          document.getElementById('EmailValidation').classList.remove('d-none');
          if(this.todo['name'])
          this.inputEmail.setFocus()
          }
        }
      }
    }
  }

  change1(e) {
    this.check(e);
    if (this.passwordBool) {
      this.passwordBool = false;
    } else {
      this.passwordBool = true;
      // this.check(e)
    }
  }
  change2(e) {
    this.check2(e);
    if (this.numberBool) {
      this.numberBool = false;
    } else {
      this.numberBool = true;

      //
    }
  }


  change3(e) {
    document.getElementById('EmailValidation').classList.add('d-none');
    // this.check3(e)
  }

  check(inp) {
    let val = inp.target.value;
    let a = document.getElementById('a6char');
    let numbers = /[0-9]/g;
    let SC = /[!@#]/;
    let b = document.getElementById('NandSC');
    if (val.length >= 6) {
      a.classList.add('text-success');
      a.classList.remove('text-danger');
    } else {
      a.classList.add('text-danger');
      a.classList.remove('text-success');
    }

    if (val.match(numbers) && val.match(SC)) {
      b.classList.add('text-success');
      b.classList.remove('text-danger');
    } else {
      b.classList.add('text-danger');
      b.classList.remove('text-success');
    }
  }
  check2(e) {
    let val = e.target.value;
    let a = document.getElementById('10D');
    if (val.length == 10) {
      a.classList.add('text-success');
      a.classList.remove('text-danger');
    } else {
      a.classList.add('text-danger');
      a.classList.remove('text-success');
    }
  }
  check3(e) {
    let a = document.getElementById('EmailValidation');
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        e.target.value
      )
    ) {
      a.classList.add('text-success');
      a.classList.remove('text-danger');
      this.emailBool = true
    } else {
      a.classList.add('text-danger');
      a.classList.remove('text-success');
      this.emailBool = false
    }
  }
}
