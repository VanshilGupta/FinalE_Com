from django.shortcuts import render
import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import utils
from rest_framework.decorators import api_view
import hashlib
import jwt
import datetime

# Create your views here.

db = settings.DB
collection2 = settings.USER_DETAILS
men = settings.MEN_PRODUCTS
women = settings.WOMEN_PRODUCTS
watch = settings.WATCHES_PRODUCTS


@csrf_exempt
def cart(request):
    token = request.headers.get('Authorization', None)
    email = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')['email']
    if request.method == 'GET':
        data = collection2.find_one({"email": email})
        return JsonResponse({"status": True, 'data': data["cart"]})

    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        try:
            print(collection2.find_one({'email': email})["cart"])
        except:
            collection2.update_one({"email": email}, {"$push": {"cart": data}})
            return JsonResponse({"status": True})
        if cartCheck(data, email):
            data = collection2.update_one(
                {'email': email}, {"$push": {"cart": data}})
            return JsonResponse({"status": True})
        return HttpResponse("Already Exists", status=401)


@csrf_exempt
def details(request):
    token = request.headers.get('Authorization', None).encode('utf-8')
    data = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
    col = collection2.find_one({'email': data['email']})
    return JsonResponse({'name': col['name'], 'email': col['email']})


def cartCheck(data, email):
    col = collection2.find_one({'email': email})["cart"]
    print("The col is ", col)
    if col:
        for item in col:
            if data['group'] == item['group'] and data['category'] == item['category'] and data['id'] == item['id']:
                return False
    return True


@csrf_exempt
def detailedCart(request):
    token = request.headers.get('Authorization', None)
    data = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
    email = data['email']
    catAindex = collection2.find_one({'email': email})["cart"]
    data = []
    for item in catAindex:
        if item['group'] == 'women':
            col = women.find_one({"category": item["category"]})[
                "entries"][item["id"]]
        elif item['group'] == 'men':
            col = men.find_one({"category": item["category"]})[
                "entries"][item["id"]]
        else:
            col = watch.find_one({"category": item["category"]})[
                "entries"][item["id"]]
        data.append(col)
    return JsonResponse({"status": True, 'data': data})


@csrf_exempt
def updateQty(request):
    token = request.headers.get('Authorization', None)
    data = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
    email = data['email']
    index = request.GET.get("index")
    quantity = json.loads(request.body)["quantity"]
    data = collection2.update_one(
        {"email": email}, {"$set": {f"cart.{str(index)}.qty": quantity}})
    return JsonResponse({"status": True})


@csrf_exempt
def removeItem(request):
    token = request.headers.get('Authorization', None)
    data = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
    email = data['email']
    index = request.GET.get("index")
    data = collection2.update_one(
        {"email": email}, {"$unset": {f"cart.{str(index)}": 1}})
    data = collection2.update_one({"email": email}, {"$pull": {"cart": None}})
    return JsonResponse({"status": True})


@csrf_exempt
@api_view(['POST'])
def login(request):
    print("run")
    req_user = json.loads(request.body)
    userid = collection2.find_one({'email': req_user['email']})
    print(req_user['password'])
    if not userid:
        return HttpResponse('Please enter a valid email', status=401)
    if hashlib.sha384(req_user['password'].encode()).hexdigest() != userid['password']:
        return HttpResponse('Invalid password', status=401)

    token = jwt.encode(
        {'email': req_user['email'],
         'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=24 * 60 * 60)
         },
        settings.SECRET_KEY,
        algorithm="HS256").decode('utf-8')
    print(type(token))
    return JsonResponse({'status': True, 'token': token})


@csrf_exempt
@api_view(['POST'])
def register(request):
    data = json.loads(request.body)
    data['password'] = hashlib.sha384(data['password'].encode()).hexdigest()
    try:
        if collection2.find_one({"email": data["email"]}) or collection2.find_one({"number": data["number"]}):
            return HttpResponse("Email or Number already exists", status=401)
        else:
            collection2.insert_one(data)
            return HttpResponse("Signup Successful!", status=200)
    except:
        collection2.insert_one(data)
        return HttpResponse("Signup Successful!", status=200)


# @utils.requireLogin
def verify(request):
    return JsonResponse({"status": True})

# ```


#   <!--Main layout-->
#   <main class="mt-5 pt-4">
#     <div class="container wow fadeIn">

#       <!-- Heading -->

#       <!--Grid row-->
#       <div class="row">

#         <!--Grid column-->
#         <div class="col-md-8 mb-4">

#           <!--Card-->
#           <div class="card">

#             <!--Card content-->
#             <form class="card-body">

#               <!--Grid row-->
#               <div class="row">

#                 <!--Grid column-->
#                 <div class="col-md-6 mb-2">

#                   <!--firstName-->
#                   <div class="md-form ">
#                     <input type="text" id="firstName" class="form-control">
#                     <label for="firstName" class="">First name</label>
#                   </div>

#                 </div>
#                 <!--Grid column-->

#                 <!--Grid column-->
#                 <div class="col-md-6 mb-2">

#                   <!--lastName-->
#                   <div class="md-form">
#                     <input type="text" id="lastName" class="form-control">
#                     <label for="lastName" class="">Last name</label>
#                   </div>

#                 </div>
#                 <!--Grid column-->

#               </div>
#               <!--Grid row-->

#               <!--Username-->

#               <!--email-->


#               <!--address-->
#               <div class="md-form mb-5">
#                 <input type="text" id="address" class="form-control" placeholder="1234 Main St">
#                 <label for="address" class="">Address</label>
#               </div>

#               <!--address-2-->
#               <div class="md-form mb-5">
#                 <input type="text" id="address-2" class="form-control" placeholder="Apartment or suite">
#                 <label for="address-2" class="">Address 2 (optional)</label>
#               </div>

#               <!--Grid row-->
#               <div class="row">

#                 <!--Grid column-->
#                 <div class="col-lg-4 col-md-12 mb-4">

#                   <label for="country">Country</label>
#                   <select class="custom-select d-block w-100" id="country" required>
#                     <option value="">Choose...</option>
#                     <option>United States</option>
#                   </select>
#                   <div class="invalid-feedback">
#                     Please select a valid country.
#                   </div>

#                 </div>
#                 <!--Grid column-->

#                 <!--Grid column-->
#                 <div class="col-lg-4 col-md-6 mb-4">

#                   <label for="state">State</label>
#                   <select class="custom-select d-block w-100" id="state" required>
#                     <option value="">Choose...</option>
#                     <option>California</option>
#                   </select>
#                   <div class="invalid-feedback">
#                     Please provide a valid state.
#                   </div>

#                 </div>
#                 <!--Grid column-->

#                 <!--Grid column-->
#                 <div class="col-lg-4 col-md-6 mb-4">

#                   <label for="zip">Zip</label>
#                   <input type="text" class="form-control" id="zip" placeholder="" required>
#                   <div class="invalid-feedback">
#                     Zip code required.
#                   </div>

#                 </div>
#                 <!--Grid column-->

#               </div>
#               <!--Grid row-->

#               <hr>

#               <div class="custom-control custom-checkbox">
#                 <input type="checkbox" class="custom-control-input" id="same-address">
#                 <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
#               </div>
#               <div class="custom-control custom-checkbox">
#                 <input type="checkbox" class="custom-control-input" id="save-info">
#                 <label class="custom-control-label" for="save-info">Save this information for next time</label>
#               </div>

#               <hr>

#               <div class="d-block my-3">
#                 <div class="custom-control custom-radio">
#                   <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required>
#                   <label class="custom-control-label" for="credit">Credit card</label>
#                 </div>
#                 <div class="custom-control custom-radio">
#                   <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required>
#                   <label class="custom-control-label" for="debit">Debit card</label>
#                 </div>
#                 <div class="custom-control custom-radio">
#                   <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required>
#                   <label class="custom-control-label" for="paypal">Paypal</label>
#                 </div>
#               </div>
#               <div class="row">
#                 <div class="col-md-6 mb-3">
#                   <label for="cc-name">Name on card</label>
#                   <input type="text" class="form-control" id="cc-name" placeholder="" required>
#                   <small class="text-muted">Full name as displayed on card</small>
#                   <div class="invalid-feedback">
#                     Name on card is required
#                   </div>
#                 </div>
#                 <div class="col-md-6 mb-3">
#                   <label for="cc-number">Credit card number</label>
#                   <input type="text" class="form-control" id="cc-number" placeholder="" required>
#                   <div class="invalid-feedback">
#                     Credit card number is required
#                   </div>
#                 </div>
#               </div>
#               <div class="row">
#                 <div class="col-md-3 mb-3">
#                   <label for="cc-expiration">Expiration</label>
#                   <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
#                   <div class="invalid-feedback">
#                     Expiration date required
#                   </div>
#                 </div>
#                 <div class="col-md-3 mb-3">
#                   <label for="cc-expiration">CVV</label>
#                   <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
#                   <div class="invalid-feedback">
#                     Security code required
#                   </div>
#                 </div>
#               </div>
#               <hr class="mb-4">
#               <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>

#             </form>

#           </div>
#           <!--/.Card-->

#         </div>
#         <!--Grid column-->

#         <!--Grid column-->
#         <div class="col-md-4 mb-4">

#           <!-- Heading -->
#           <h4 class="d-flex justify-content-between align-items-center mb-3">
#             <span class="text-muted">Your cart</span>
#             <span class="badge badge-secondary badge-pill">3</span>
#           </h4>

#           <!-- Cart -->
#           <ul class="list-group mb-3 z-depth-1">
#             <li class="list-group-item d-flex justify-content-between lh-condensed">
#               <div>
#                 <h6 class="my-0">Product name</h6>
#                 <small class="text-muted">Brief description</small>
#               </div>
#               <span class="text-muted">$12</span>
#             </li>
#             <li class="list-group-item d-flex justify-content-between lh-condensed">
#               <div>
#                 <h6 class="my-0">Second product</h6>
#                 <small class="text-muted">Brief description</small>
#               </div>
#               <span class="text-muted">$8</span>
#             </li>
#             <li class="list-group-item d-flex justify-content-between lh-condensed">
#               <div>
#                 <h6 class="my-0">Third item</h6>
#                 <small class="text-muted">Brief description</small>
#               </div>
#               <span class="text-muted">$5</span>
#             </li>
#             <li class="list-group-item d-flex justify-content-between bg-light">
#               <div class="text-success">
#                 <h6 class="my-0">Promo code</h6>
#                 <small>EXAMPLECODE</small>
#               </div>
#               <span class="text-success">-$5</span>
#             </li>
#             <li class="list-group-item d-flex justify-content-between">
#               <span>Total (USD)</span>
#               <strong>$20</strong>
#             </li>
#           </ul>
#           <!-- Cart -->

#           <!-- Promo code -->
#           <form class="card p-2">
#             <div class="input-group">
#               <input type="text" class="form-control" placeholder="Promo code" aria-label="Recipient's username" aria-describedby="basic-addon2">
#               <div class="input-group-append">
#                 <button class="btn btn-secondary btn-md waves-effect m-0" type="button">Redeem</button>
#               </div>
#             </div>
#           </form>
#           <!-- Promo code -->

#         </div>
#         <!--Grid column-->

#       </div>
#       <!--Grid row-->

#     </div>
#   </main>
#   <!--Main layout-->

#   <!--Footer-->
#   <footer class="page-footer text-center font-small mt-4 wow fadeIn">

    
#     <div class="footer-copyright py-3">
#       © 2018 Copyright:
#       <a href="https://mdbootstrap.com/education/bootstrap/" target="_blank"> MDBootstrap.com </a>
#     </div>
#     <!--/.Copyright-->

#   </footer>
#   <!--/.Footer-->
