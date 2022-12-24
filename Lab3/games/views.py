from games.serializers import  GamesFilter
from django.contrib.auth import authenticate, login, logout
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from games.serializers import UserSerializer, GameSerializer, BasketSerializer
from games.models import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions



class GameViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Game.objects.all().order_by('pk')
    serializer_class = GameSerializer  # Сериализатор для модели
    filter_backends = (DjangoFilterBackend,)
    filterset_class = GamesFilter
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint, который позволяет просматривать и редактировать акции компаний
    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = User.objects.all().order_by('pk')
    serializer_class = UserSerializer  # Сериализатор для модели


class BasketViewSet(viewsets.ModelViewSet):
    queryset = Basket.objects.all().order_by('pk')
    serializer_class = BasketSerializer  # Сериализатор для модели

class Registration(APIView):
    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        if User.objects.filter(username = username).exists():
            return Response({'error':'Username already exists'})
        else:
            user = User.objects.create_user( username=username, password=password)
            user.save()
        return Response({'success': 'User created'});


class GetCSRFToken(APIView):
    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})

class Check(APIView):
    def get(self, request, format=None):
        user = self.request.user
        isAuthenticated = user.is_authenticated

        if isAuthenticated:
            return Response({'isAuthenticated':'success'})
        else:
            return Response({'isAutheticated': 'error'})


class LoginView(APIView):
    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'success':'User authenticated', 'username': username, 'pk':user.pk})
        else:
            return Response({'error':'Error Authenticated'})

class LogoutView(APIView):
    def post(self, request, format=None):

        try:
            logout(request)
            return Response({'success': 'User Logout'})
        except:
            return Response({'error':'Error logout'})


