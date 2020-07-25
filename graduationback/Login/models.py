from django.db import models
# from product.models import *
from django.contrib.auth.models import AbstractUser,User



# Create your models here.
class Userinfo(models.Model):
    name = models.CharField(null=True,blank=True,max_length=16,verbose_name="用户姓名")
    nickname = models.CharField(null=True,blank=True,max_length=16,verbose_name="用户微信名")
    birthday = models.DateField(null=True, blank=True, verbose_name="出生年月")
    gender = models.CharField(null=True, blank=True, max_length=6, choices=(("1", u"男"), ("0", "女")), default="1",
                              verbose_name="性别")
    age = models.IntegerField(null=True,blank=True,verbose_name="年龄")
    school_number = models.CharField(null=True,blank=True,unique=True,max_length=30,verbose_name="学号")
    human_height = models.IntegerField(null=True,blank=True,verbose_name="身高")
    school = models.CharField(null=True,blank=True,max_length=60,default="山西大学",verbose_name="学校")
    home = models.CharField(null=True,blank=True,max_length=50,verbose_name="家乡")
    profession = models.CharField(null=True,blank=True,max_length=60,verbose_name="专业")
    location_house = models.CharField(null=True,blank=True,max_length=100,verbose_name="宿舍楼")
    mobile = models.CharField(null=True, blank=True, max_length=11, verbose_name="电话", unique=True)
    unionId = models.CharField(null=True, blank=True, max_length=50, verbose_name="unionId")
    open_id = models.CharField(null=True, blank=True, max_length=50, verbose_name="openid")
    session_key = models.CharField(null=True, blank=True, max_length=50, verbose_name="session_key")
    info = models.CharField(null=True, blank=True, max_length=50, verbose_name="个人简介")
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    date_updated = models.DateTimeField(auto_now=True, null=True)
    collect_time = models.IntegerField(default=0)
    image = models.CharField(max_length=255, blank=True, null=True, verbose_name="头像")


    user_image = models.TextField(null=True,blank=True,verbose_name="用户上传图片")
    user_interest = models.TextField(null=True,blank=True,verbose_name="用户兴趣")
    user_daily = models.TextField(null=True,blank=True,verbose_name="用户日常")
    is_showinfo = models.BooleanField(default=True,verbose_name="是否显示资料")
    wx_location = models.CharField(null=True,blank=True,max_length=100,verbose_name="微信位置")


    class Meta:
        verbose_name = "用户"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

class Usermassage(models.Model):
    otherid = models.IntegerField(verbose_name="留言者id")
    othername = models.CharField(max_length=60,blank=True,null=True,verbose_name="留言者微信名")
    otherimage = models.CharField(max_length=255, blank=True, null=True, verbose_name="留言者头像")
    massage_created = models.DateTimeField(auto_now_add=True, null=True,verbose_name="留言日期")
    massage_info = models.TextField(null=True,blank=True,verbose_name="留言信息")
    owner = models.ForeignKey(Userinfo,on_delete=models.CASCADE,related_name="user_massage")

    class Meta:
        verbose_name = "用户留言"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.othername

class UserCollection(models.Model):
    user = models.ForeignKey(Userinfo,on_delete=models.CASCADE,related_name="user_collection")
    productid = models.IntegerField(verbose_name="商品id")
    product_price = models.CharField(null=True,blank=True,max_length=100,verbose_name="商品价格")
    product_owner = models.CharField(null=True,blank=True,max_length=16,verbose_name="商品用户姓名")
    product_ownerimage = models.TextField(null=True,blank=True,verbose_name="用户头像")
    product_userinfo = models.CharField(null=True, blank=True, max_length=100, verbose_name="商品用户个人简介")
    product_image = models.TextField(null=True,blank=True,verbose_name="商品图片")
    product_name = models.CharField(max_length=200,verbose_name="商品名称")
    product_house = models.CharField(null=True,blank=True,max_length=100,verbose_name="宿舍楼")
    collect_created = models.DateTimeField(auto_now_add=True, null=True,verbose_name="收藏日期")


    class Meta:
        verbose_name = "用户收藏"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.product_owner
