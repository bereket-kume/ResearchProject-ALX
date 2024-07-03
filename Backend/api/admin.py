from django.contrib import admin
from .models import Category, Item, ChatCustomer, MessageCustomer

admin.site.register(Category)
admin.site.register(Item)
admin.site.register(ChatCustomer)
admin.site.register(MessageCustomer)
