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
from django.urls import path,include

urlpatterns = [
<<<<<<< HEAD
    path('api/admin/', admin.site.urls),
    path('api/women/', include("WomenDetails.urls")),
    path('api/men/', include("MenDetails.urls")),
    path('api/user/', include("UserDetails.urls")),
    path('api/watches/', include("WatchesDetails.urls"))
=======
    path('admin/', admin.site.urls),
    path('women/', include("WomenDetails.urls")),
    path('men/', include("MenDetails.urls")),
    path('user/', include("UserDetails.urls")),
    path('watches/', include("WatchesDetails.urls")),
    path('', include("Others.urls"))
>>>>>>> 481784507a15e411e6916aa1a332ff23310c262b

]
