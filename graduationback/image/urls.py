from django.urls import path,include
from image import views



urlpatterns = [
    path('uptoken/', views.qiniu_uptoken),
]