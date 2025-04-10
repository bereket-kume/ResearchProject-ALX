from .models import Item, Category
from rest_framework import serializers
from .models import Item, Category, MessageCustomer, ChatCustomer, Notification
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id','username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user
    
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

class ChatSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    buyer_username = serializers.CharField(source='buyer.username', read_only=True)
    seller_username = serializers.CharField(source='seller.username', read_only=True)

    class Meta:
        model = ChatCustomer
        fields = ['id', 'product', 'product_name', 'buyer', 'buyer_username', 'seller', 'seller_username', 'created_at']

class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    chat_id = serializers.PrimaryKeyRelatedField(source='chat', queryset=ChatCustomer.objects.all())

    class Meta:
        model = MessageCustomer
        fields = ['id', 'chat_id', 'sender', 'sender_username', 'content', 'timestamp', 'is_read']

    def create(self, validated_data):
        chat = validated_data.pop('chat')
        message = MessageCustomer.objects.create(chat=chat, **validated_data)
        return message

class NotificationSerializer(serializers.ModelSerializer):
    message_content = serializers.CharField(source='message.content', read_only=True)
    sender_username = serializers.CharField(source='message.sender.username', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'message_content', 'sender_username', 'product', 'product_name', 'timestamp', 'is_read']

class ItemSerializer(serializers.ModelSerializer):
    created_by_username = serializers.SerializerMethodField()

    def get_created_by_username(self, obj):
        return obj.created_by.username

    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'price', 'image', 'is_sold', 'created_at', 'Category', 'created_by', 'created_by_username']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['name', 'descripation', 'price', 'image', 'Category']
    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        return Item.objects.create(created_by=user, **validated_data)
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        