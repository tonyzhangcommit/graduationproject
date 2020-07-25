from django.contrib import admin
from django.contrib.auth.models import Permission, Group,User

from .models import *
# Register your models here.

admin.site.register(Userinfo)
admin.site.register(Usermassage)
admin.site.register(UserCollection)

