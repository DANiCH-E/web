from django.db import models
from django.contrib.auth.models import User
from django_filters import rest_framework as filters
class Game(models.Model):
    name = models.CharField(max_length=30, null=True)
    release_date = models.CharField(max_length=30, null=True)
    developer = models.CharField(max_length=30, null=True)
    publisher = models.CharField(max_length=30, null=True)
    description = models.CharField(max_length=255, null=True)
    genre = models.CharField(max_length=30, null=True)
    price = models.IntegerField(null=True)
    img = models.CharField(max_length=30, blank=True, null=True)


    class Meta:
        managed = False
        db_table = 'games'

# class User(models.Model):
#     user_name = models.CharField(max_length=30)
#     login = models.CharField(max_length=30)
#     password = models.CharField(max_length=30)
#
#     class Meta:
#         managed = False
#         db_table = 'users'

class Basket(models.Model):
    user_id = models.IntegerField()
    game_id = models.IntegerField()
    buyed = models.CharField(max_length=30, null=True)
    installed = models.CharField(max_length=30, null=True)

    class Meta:
        managed = False
        db_table = 'basket'


