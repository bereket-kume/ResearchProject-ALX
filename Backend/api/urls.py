from django.urls import path
from . import views

urlpatterns = [
    path('user/', views.user_list, name='user_list'),
    path('register/', views.user_register, name='user_register'),
    path('login/', views.user_login, name='user_login'),
    path('logout/', views.user_logout, name='user_logout'),
    path('items/', views.itemList, name='itemlist'),
    path('items/<int:pk>/', views.item_detail, name='item_detail'),
    path('items/create/', views.item_create, name='item_create'),
    path('categories/', views.categoryList, name='categorylist'),
    path('items/<int:pk>/delete/', views.item_delete, name='item_delete'),
    path('items/<int:pk>/update/', views.item_update, name='item_update'),
    path('chats/', views.chat_list, name='chat_list'),
    path('chats/<int:pk>/', views.chat_detail, name='chat_detail'),
    path('messages/', views.message_list, name='message_list'),
    path('messages/<int:pk>/', views.message_detail, name='message_detail'),
    
    # Chat endpoints
    path('chat/product/<int:product_id>/', views.get_or_create_chat, name='get_or_create_chat'),
    path('chat/<int:chat_id>/messages/', views.get_messages, name='get_messages'),
    path('chat/<int:chat_id>/send/', views.send_message, name='send_message'),
    
    # Notification endpoints
    path('notifications/', views.get_notifications, name='get_notifications'),
    path('notifications/<int:notification_id>/mark_read/', views.mark_notification_read, name='mark_notification_read'),
]
