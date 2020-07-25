from django.db import models
from Login.models import *
from django.contrib.auth.models import User



# Create your models here.
class Category(models.Model):
    # 商品分类
    name = models.CharField(default="", max_length=30, verbose_name="类别名", help_text="类别名", unique=True)
    description = models.TextField(null=True, blank=True, verbose_name="类别描述", help_text="类别描述")  # to remove
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    date_updated = models.DateTimeField(auto_now=True, null=True)
    is_hot = models.BooleanField(default=False, verbose_name="是否热门")
    class Meta:
        verbose_name = "商品类型"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Product(models.Model):
    CONDITION_TYPE = (
        ('100', "全新"),
        ('99', "九成新"),
        ('80', "八成新"),
        ('70', "七成新及其以下"),
    )
    PRODUCT_TYPE = (
        ('0',"sale"),
        ('1',"rent")
    )
    owner = models.ForeignKey(Userinfo,on_delete=models.CASCADE,related_name="myproduct")
    category = models.ForeignKey(Category,verbose_name="商品类别",on_delete=models.CASCADE,related_name="product_category")
    product_name = models.CharField(max_length=200,verbose_name="商品名称")
    product_type = models.CharField(default='sale', choices=PRODUCT_TYPE, max_length=30, verbose_name="商品类型")
    conditions = models.CharField(default='100', null=True, choices=CONDITION_TYPE, max_length=30, verbose_name="新旧程度")
    raw_price = models.FloatField(null=True, verbose_name="购入价格")
    price = models.FloatField(null=True, verbose_name="出售价格")
    remark = models.TextField(null=True, blank=True, verbose_name="商品详情")
    delete_flag = models.BooleanField(default=False)
    trading_method = models.CharField(null=True, blank=True, max_length=200,verbose_name="交易方式")
    browsing_volume = models.IntegerField(default=0, verbose_name='浏览次数')
    collecit_volume = models.IntegerField(default=0,verbose_name="collect_time")
    add_like = models.IntegerField(default=0,verbose_name="add_like time")
    product_image = models.TextField(null=True, blank=True, verbose_name="商品图片")
    owner_image = models.TextField(null=True, blank=True, verbose_name="商品所有者头像")
    owner_info = models.CharField(max_length=100,null=True, blank=True, verbose_name="商品所有者座右铭")
    owner_name = models.CharField(max_length=60,null=True, blank=True, verbose_name="商品所有者姓名")
    owner_location = models.CharField(max_length=100,null=True, blank=True, verbose_name="商品所有者位置")
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    date_updated = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.product_name

    class Meta:
        verbose_name = "商品"
        verbose_name_plural = verbose_name
