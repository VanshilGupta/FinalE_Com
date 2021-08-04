import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';//environment.SERVER_URL +'/womenswear/'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  getUser() {
    return this.http.get(environment.SERVER_URL +'/user/details');
  }
  getdata2(category, group = 'women') {
    return this.http.get(`http://13.232.185.209/api/${group}/data`, {
      params: { category: category },
    });
  }

  getProductDetails(category, group = 'women') {
    return this.http.get(environment.SERVER_URL +`/${group}/product`, {
      params: { category: category },
    });
  }

  getUserCart(name, group = 'women') {
    return this.http.get(environment.SERVER_URL +`/user/cart`, {
      params: { name: name },
    });
  }
  postCart( category, id, group = 'women') {
    return this.http.post(
      environment.SERVER_URL +'/user/cart',
      { group: group, category: category, id: id, qty: 1 }
    );
  }

  getDetailedCart(name, group = 'women') {
    return this.http.get(environment.SERVER_URL +'/user/cartDetails', {
      params: { group: group, name: name },
    });
  }
  updateQty(name, index, qty, group = 'women') {
    return this.http.post(
      environment.SERVER_URL +'/user/updateQty',
      { quantity: qty },
      { params: { name: name, index: index } }
    );
  }

  removeCart(name, index, group = 'women') {
    return this.http.get(environment.SERVER_URL +'/user/removeItem', {
      params: { name: name, index: index },
    });
  }

  register(data) {
    return this.http.post(environment.SERVER_URL +'/user/register', data, {
      responseType: 'text',
    });
  }
  login(data) {
    return this.http.post(environment.SERVER_URL +'/user/login', data);
  }
  addToCart(id,cat,group) {
    let token = localStorage.getItem('token')
    if(!token){
      alert("Please login first")
      this.router.navigate(["/login"])
    }
    else{
    id = parseInt(id);
    this.postCart(cat, id,group).subscribe(
      (data) => {
        console.log(data);
        alert('Added');
      },
      (error) => {
        alert(error['error']);
      }
    );

    }
    
  }
  getStates(){
    return this.http.get('http://127.0.0.1:8000/states')
  }
}
