# Generated by Django 2.0.7 on 2019-05-05 09:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Login', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', help_text='类别名', max_length=30, unique=True, verbose_name='类别名')),
                ('description', models.TextField(blank=True, help_text='类别描述', null=True, verbose_name='类别描述')),
                ('date_created', models.DateTimeField(auto_now_add=True, null=True)),
                ('date_updated', models.DateTimeField(auto_now=True, null=True)),
                ('is_hot', models.BooleanField(default=False, verbose_name='是否热门')),
            ],
            options={
                'verbose_name_plural': '商品类型',
                'verbose_name': '商品类型',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=200, verbose_name='商品名称')),
                ('product_type', models.CharField(choices=[('0', 'sale'), ('1', 'rent')], default='sale', max_length=30, verbose_name='商品类型')),
                ('conditions', models.CharField(choices=[('100', '全新'), ('99', '九成新'), ('80', '八成新'), ('70', '七成新及其以下')], default='100', max_length=30, null=True, verbose_name='新旧程度')),
                ('raw_price', models.FloatField(null=True, verbose_name='购入价格')),
                ('price', models.FloatField(null=True, verbose_name='出售价格')),
                ('remark', models.TextField(blank=True, null=True, verbose_name='商品详情')),
                ('delete_flag', models.BooleanField(default=False)),
                ('trading_method', models.CharField(blank=True, max_length=200, null=True, verbose_name='交易方式')),
                ('browsing_volume', models.IntegerField(default=0, verbose_name='浏览次数')),
                ('collecit_volume', models.IntegerField(default=0, verbose_name='collect_time')),
                ('add_like', models.IntegerField(default=0, verbose_name='add_like time')),
                ('product_image', models.TextField(blank=True, null=True, verbose_name='商品图片')),
                ('owner_image', models.TextField(blank=True, null=True, verbose_name='商品所有者头像')),
                ('owner_info', models.CharField(blank=True, max_length=100, null=True, verbose_name='商品所有者座右铭')),
                ('owner_name', models.CharField(blank=True, max_length=60, null=True, verbose_name='商品所有者姓名')),
                ('owner_location', models.CharField(blank=True, max_length=100, null=True, verbose_name='商品所有者位置')),
                ('date_created', models.DateTimeField(auto_now_add=True, null=True)),
                ('date_updated', models.DateTimeField(auto_now=True, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_category', to='product.Category', verbose_name='商品类别')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='myproduct', to='Login.Userinfo')),
            ],
            options={
                'verbose_name_plural': '商品',
                'verbose_name': '商品',
            },
        ),
    ]
