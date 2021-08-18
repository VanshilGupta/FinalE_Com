"""E_Com URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('cart',views.cart, name = "User"),
    path('cartDetails',views.detailedCart, name = "Cart"),
    path('updateQty',views.updateQty, name = "Quantity"),
    path('removeItem',views.removeItem ,name = "Remove"),
    path('login',views.login ,name = "login"),
    path('verify',views.verify,name = "verify"),
    path('register',views.register,name = "Registrations"),
    path('details',views.details,name = "UserDetails"),
    path('checkOut',views.checkOut,name = "SaveCheckOutDetails"),
    path('removeCheckOut',views.removeCheckOut,name = "RemoveCheckOutDetails"),
    path('orderPlaced',views.placeOrder,name = "OrderPlaced"),
    path('orders',views.getOrders,name = "GetOrders"),
    path('history',views.getHistory,name = "GetHistory")
]
