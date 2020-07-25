from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from .models import *
from .serializers import *
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import mixins
from rest_framework import generics
from django.contrib.auth.models import User
from Login.verifications import wxlogin,create_jwt_token
from utils.default_value import default_response
from utils.decorator import new_login_check


# Create your views here.

# 获取用户列表
class user_list(generics.ListCreateAPIView):
    queryset = Userinfo.objects.all()
    serializer_class = UserInfoSerializer

# 针对特定用户操作
class user_detail(APIView):
    def get_objects(self,pk):
        try:
            return Userinfo.objects.get(pk=pk)
        except Userinfo.DoesNotExist:
            raise Http404
    def get(self,request,pk,format=None):
        user = self.get_objects(pk)
        serializer = UserInfoSerializer(user)
        result = default_response()
        result['data'] = serializer.data
        return Response(result)
    def put(self,request,pk,format=None):
        user = self.get_objects(pk)
        serializer = UserInfoSerializer(user,data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            result = default_response()
            result['data'] = serializer.data
            return Response(result)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def delete(self,request,pk,format=None):
        user = self.get_objects(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class user_message(mixins.ListModelMixin,generics.GenericAPIView,mixins.CreateModelMixin):
    queryset = Usermassage.objects.all()
    serializer_class = UsermassageSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        result = default_response()
        result['data'] = serializer.data
        return Response(result)

class user_collect(mixins.ListModelMixin,generics.GenericAPIView,mixins.CreateModelMixin):
    queryset = UserCollection.objects.all()
    serializer_class = CollectSerializer
    def get_objects(self,pk):
        try:
            return UserCollection.objects.get(pk=pk)
        except UserCollection.DoesNotExist:
            raise Http404

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        result = default_response()
        result['data'] = serializer.data
        return Response(result)

    def delete(self, request, pk, format=None):
        collect = self.get_objects(pk)
        collect.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def wxlogin_view(request, format=None):
    """
    小程序端微信登录
    """
    print(request.data)
    result = default_response()
    instance = wxlogin(request)
    if instance is None:
        result['data']['reseaion'] = "登录失败"
        return Response(result)
    jwt_token = create_jwt_token(instance.open_id)
    result['data']['JWT'] = jwt_token
    result['data']['user_id'] = instance.id
    return Response(result)

