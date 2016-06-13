from django.shortcuts import render
from django.shortcuts import redirect

# Create your views here.

def home(request):

    return redirect ('/static/index.html')