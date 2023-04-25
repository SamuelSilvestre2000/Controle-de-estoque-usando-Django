from django.urls import path
from . import views

urlpatterns = [
    path('produtos/', views.ProdutoListCreateView.as_view(), name='produto_list_create'),
    path('produtos/<int:pk>/', views.ProdutoRetrieveUpdateDestroyView.as_view(), name='produto_retrieve_update_destroy'),
]
