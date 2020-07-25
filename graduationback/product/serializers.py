from .models import *
from Login.serializers import *
from rest_framework.serializers import ModelSerializer




class ProductSerializer(ModelSerializer):
    # product_image = ProductImageSerializer(many=True)

    class Meta:
        model = Product
        fields = "__all__"

class CategorySerializer(ModelSerializer):
    product_category = ProductSerializer(many=True)
    class Meta:
        model = Category
        fields = "__all__"

