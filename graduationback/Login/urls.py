from django.urls import path,include
from Login import views



urlpatterns = [
    path('userlist/', views.user_list.as_view()),
    path('wx_login/', views.wxlogin_view),
    path('message/', views.user_message.as_view()),
    # path('userinfo/<int:pk>/', views.UserView.as_view()),
    path('user/<int:pk>/', views.user_detail.as_view()),
    path('collect/',views.user_collect.as_view()),
    path('collect/<int:pk>/', views.user_collect.as_view()),
    # path('interest/', views.interest_detail.as_view()),
]