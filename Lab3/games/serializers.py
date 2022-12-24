from games.models import Game, User,Basket
from rest_framework import serializers
from django_filters import rest_framework as filters


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Game
        # Поля, которые мы сериализуем
        fields = ["pk", "name", "release_date", "developer", "publisher", "description", "genre", "price", "img"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = User
        # Поля, которые мы сериализуем
        fields = ["pk", "username", "password"]

class BasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basket
        fields = ["pk", "user_id", "game_id", "installed", "buyed"]

class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass

class GamesFilter(filters.FilterSet):
    genre = CharFilterInFilter(field_name='genre', lookup_expr='in')
    price = filters.RangeFilter()

    class Meta:
        model = Game
        fields = ['price', 'genre']