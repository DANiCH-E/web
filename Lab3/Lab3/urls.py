from django.contrib import admin
from games import views as games_views
from django.urls import re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from games.views import Registration, GetCSRFToken, LoginView, LogoutView, Check
router = routers.DefaultRouter()
router.register(r'games', games_views.GameViewSet)
router.register(r'users', games_views.UserViewSet)
router.register(r'basket', games_views.BasketViewSet)
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('admin/', admin.site.urls),
    path('api/register/', Registration.as_view(), name ='register'),
    path('csrf_cookie', GetCSRFToken.as_view()),
    path('authenticated', Check.as_view()),
    path('logout', LogoutView.as_view()),
    path('login', LoginView.as_view()),
    path('admin/', admin.site.urls),
    # path('admin/', admin.site.urls),
    # path('auth/', include('djoser.urls')),
    # path('auth/', include('djoser.urls.authtoken')),
    # path('auth/', include('djoser.urls.jwt')),
]
