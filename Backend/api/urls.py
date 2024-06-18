from django.urls import path
from . import views

urlpatterns = [
    path('items/', views.itemList, name='itemlist'),
    path('items/<int:pk>/', views.item_detail, name='item_detail'),
    path('items/create/', views.item_create, name='item_create')

]
