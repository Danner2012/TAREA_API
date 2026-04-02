from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from api.views.auth_views import LoginView
from api.views.user_views import UserProfileView, TecnicoViewSet
from api.views.pokemon_views import PokemonListView

router = DefaultRouter()
router.register(r'tecnicos', TecnicoViewSet, basename='tecnico')

urlpatterns = [
    path('pokemon/', PokemonListView.as_view(), name='pokemon_list'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserProfileView.as_view(), name='user_profile'),
    path('', include(router.urls)),
]
