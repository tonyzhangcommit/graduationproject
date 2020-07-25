from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics
from utils.default_value import default_response

# Create your views here.

class ProductList(mixins.ListModelMixin,generics.GenericAPIView,mixins.CreateModelMixin):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self,request,format=None):
        product = Product.objects.all()
        serializer = ProductSerializer(product,many=True)
        result = default_response()
        result['data'] = serializer.data
        return Response(result)

    def post(self,request,*args,**kwargs):
        # return self.create(request,*args,**kwargs)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        result = default_response()
        result['data'] = serializer.data
        return Response(result)
class product_detail(APIView):
    def get_objects(self,pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404
    def get(self,request,pk,format=None):
        product = self.get_objects(pk)
        serializer = ProductSerializer(product)
        result = default_response()
        result['data'] = serializer.data
        return Response(result)
    def put(self,request,pk,format=None):
        product = self.get_objects(pk)
        serializer = ProductSerializer(product,data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def delete(self,request,pk,format=None):
        product = self.get_objects(pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CategoryList(mixins.ListModelMixin,generics.GenericAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # def get(self,request,*args,**kwargs):
        # result = default_response()
        # result['data'] = self.list(request,*args,**kwargs)
        # return self.list(request,*args,**kwargs)
        # return Response(result)

    def get(self,request,format=None):
        category = Category.objects.all()
        serializer = CategorySerializer(category,many=True)
        result = default_response()
        result['data'] = serializer.data
        return Response(result)