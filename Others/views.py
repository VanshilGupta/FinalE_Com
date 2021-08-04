from django.shortcuts import render
import json
from django.http import HttpResponse , JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import utils
import jwt
import datetime
from rest_framework.decorators import api_view
# Create your views here.

@csrf_exempt
def getStates(request):
    with open("states.json",mode='r') as jsonFile:
        data = json.load(jsonFile)
        return JsonResponse({'data' : list(data.values())})