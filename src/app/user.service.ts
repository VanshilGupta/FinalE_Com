import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';//'http://127.0.0.1:8000 '  +'/womenswear/'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  getUser() {
    return this.http.get('http://127.0.0.1:8000/user/details');
  }
  getdata2(category, group = 'women') {
    return this.http.get(`http://127.0.0.1:8000/${group}/data`, {
      params: { category: category },
    });
  }

  getProductDetails(category, group = 'women') {
    return this.http.get('http://127.0.0.1:8000' +`/${group}/product`, {
      params: { category: category },
    });
  }

  getUserCart(name, group = 'women') {
    return this.http.get('http://127.0.0.1:8000'  +`/user/cart`, {
      params: { name: name },
    });
  }
  postCart( category, id, group = 'women') {
    return this.http.post(
      'http://127.0.0.1:8000'  +'/user/cart',
      { group: group, category: category, id: id, qty: 1 }
    );
  }

  getDetailedCart(name, group = 'women') {
    return this.http.get('http://127.0.0.1:8000'  +'/user/cartDetails', {
      params: { group: group, name: name },
    });
  }
  updateQty(name, index, qty, group = 'women') {
    return this.http.post(
      'http://127.0.0.1:8000'  +'/user/updateQty',
      { quantity: qty },
      { params: { name: name, index: index } }
    );
  }

  removeCart(name, index, group = 'women') {
    return this.http.get('http://127.0.0.1:8000'  +'/user/removeItem', {
      params: { name: name, index: index },
    });
  }

  register(data) {
    return this.http.post('http://127.0.0.1:8000'  +'/user/register', data, {
      responseType: 'text',
    });
  }
  login(data) {
    return this.http.post('http://127.0.0.1:8000'  +'/user/login', data);
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
    return this.http.get('http://127.0.0.1:8000 '  +'/states')
  }
  checkOut(data){
    return this.http.post('http://127.0.0.1:8000 '  + '/user/checkOut',data)
  }
  getCheckoutData(){
    return this.http.get('http://127.0.0.1:8000 '  + '/user/checkOut')
  }
  removeCheckOut(index){
    return this.http.get('http://127.0.0.1:8000 '  + '/user/removeCheckOut' , {params : {index : index}})
  }

  orderPlaced(price){
    return this.http.get('http://127.0.0.1:8000 '  + '/user/orderPlaced',{params : {'totalPrice' : price}})
  }
  getOrders(){
    return this.http.get('http://127.0.0.1:8000 '  + '/user/orders')
  }
  getHistory(){
    return this.http.get('http://127.0.0.1:8000 '  + '/user/history')
  }
  get(){

  }
}
