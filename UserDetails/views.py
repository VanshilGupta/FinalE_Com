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
    return JsonResponse({'name': col['name'], 'email': col['email'], 'number': ['number']})


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


@csrf_exempt
def checkOut(request):
    token = request.headers.get('Authorization', None)
    email = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')['email']
    if request.method == "POST":
        data = json.loads(request.body)
        col = collection2.find_one({'email': email})
        try:
            for item in col['checkOut']:
                if item == data:
                    return JsonResponse({'status': True})
            collection2.update_one(
                {'email': email}, {'$push': {'checkOut': data}})
            return JsonResponse({'status': True})
        except:
            collection2.update_one(
                {'email': email}, {'$push': {'checkOut': data}})
            return JsonResponse({'status': True})
    else:
        try:
            return JsonResponse({'status': True, 'data': collection2.find_one({'email': email})['checkOut']})
        except:
            return JsonResponse({'status': False})


@csrf_exempt
def removeCheckOut(request):
    token = request.headers.get('Authorization', None)
    email = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')['email']
    index = request.GET.get("index")
    data = collection2.update_one(
        {"email": email}, {"$unset": {f"checkOut.{str(index)}": 1}})
    data = collection2.update_one(
        {"email": email}, {"$pull": {"checkOut": None}})
    return JsonResponse({"status": True})


@csrf_exempt
def placeOrder(request):
    token = request.headers.get('Authorization', None)
    email = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')['email']
    data = collection2.find_one({'email': email})['cart']
    collection2.update_one({'email': email}, {'$unset': {"cart": 1}})
    date = datetime.datetime.now().strftime('%d %B %Y')
    entry = {'data': data, 'date': date}
    collection2.update_one(
        {'email': email}, {'$push': {'orderHistory': entry}})
    return JsonResponse({'status': True})


@csrf_exempt
def getHistory(request):
    token = request.headers.get('Authorization', None)
    email = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')['email']
    data = collection2.find_one({'email': email})['orderHistory']
    print('runningggggggggggggg')
    try:
        for i in range(len(data)):
            data2 = []
            for item in data[i]['data']:
                if item['group'] == 'women':
                    col = women.find_one({"category": item["category"]})[
                        "entries"][item["id"]]
                elif item['group'] == 'men':
                    col = men.find_one({"category": item["category"]})[
                        "entries"][item["id"]]
                else:
                    col = watch.find_one({"category": item["category"]})[
                        "entries"][item["id"]]
                data2.append(col)
            data[i]['data'] = data2
        return JsonResponse({'data': data})
    except:
        return HttpResponse('No order placed before', status=401)


@utils.requireLogin
def verify(request):
    return JsonResponse({"status": True})


# 2
# 23
# 24
# .btn-shake:hover {
#   animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
#   transform: translate3d(0, 0, 0);
#   backface-visibility: hidden;
#   perspective: 1000px;
# }

# @keyframes shake {
#   10%, 90% {
#     transform: translate3d(-1px, 0, 0);
#   }

#   20%, 80% {
#     transform: translate3d(2px, 0, 0);
#   }

#   30%, 50%, 70% {
#     transform: translate3d(-4px, 0, 0);
#   }

#   40%, 60% {
#     transform: translate3d(4px, 0, 0);
#   }
# }
