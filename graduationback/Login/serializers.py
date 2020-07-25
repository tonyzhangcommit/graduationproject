from rest_framework import serializers
from .models import *
from product.serializers import *
from django.contrib.auth.models import User

class CollectSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCollection
        fields = "__all__"



class UsermassageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usermassage
        fields = "__all__"


class UserInfoSerializer(serializers.ModelSerializer):
    user_massage = UsermassageSerializer(many=True,read_only=True)
    user_collection = CollectSerializer(many=True,read_only=True)
    myproduct = ProductSerializer(many=True,read_only=True)

    class Meta:
        model = Userinfo
        fields = "__all__"
        # fields = ("id","name","nickname","school_number","unionId","open_id","session_key","info","birthday","gender","human_height",
        #           "school","home","profession","mobile","image","user_interest","user_daily","user_massage")
