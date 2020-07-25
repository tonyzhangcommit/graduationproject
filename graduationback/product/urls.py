from django.urls import path,include
from product import views
from rest_framework.urlpatterns import format_suffix_patterns



urlpatterns = [
    path('product/', views.ProductList.as_view()),
    path('category/',views.CategoryList.as_view()),
    path('product/<int:pk>/', views.product_detail.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)