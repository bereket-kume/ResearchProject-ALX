from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Item, Category, MessageCustomer, ChatCustomer, Notification, User
from .serializers import (
    CategorySerializer, ItemSerializer, UserLoginSerializer, UserRegisterSerializer,
    UserSerializer, ItemCreateSerializer, ChatSerializer, MessageSerializer,
    NotificationSerializer
)
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db.models import Q
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
def user_register(request):
    if request.method == 'POST':
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST', 'GET'])
def user_login(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token)
                
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    try:
        refresh_token = request.data['refresh']
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"detail": "Logout successful."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": "Invalid token or token missing."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def itemList(request):
    items = Item.objects.all()
    serializers = ItemSerializer(items, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def item_detail(request, pk):
    try:
        item = Item.objects.get(pk=pk)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ItemSerializer(item)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def item_create(request):
    serializer = ItemCreateSerializer(data=request.data, context={'request': request})

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def categoryList(request):
    categories = Category.objects.all()
    serializers = CategorySerializer(categories, many=True)
    return Response(serializers.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def item_delete(request, pk):
    try:
        item = Item.objects.get(pk=pk)
        if item.created_by != request.user:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def item_update(request, pk):
    try:
        item = Item.objects.get(pk=pk)
        if item.created_by != request.user:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)
        serializer = ItemCreateSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST', 'GET'])
def chat_list(request):
    if request.method == 'GET':
        chats = ChatCustomer.objects.all()
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ChatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST', 'GET', 'DELETE'])
def chat_detail(request, pk):
    try:
        chat = ChatCustomer.objects.get(pk=pk)
    except ChatCustomer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ChatSerializer(chat)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        chat.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['POST', 'GET'])
def message_list(request):
    if request.method == 'GET':
        messages = MessageCustomer.objects.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST', 'GET', 'DELETE'])
def message_detail(request, pk):
    try:
        message = MessageCustomer.objects.get(pk=pk)
    except MessageCustomer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MessageSerializer(message)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_or_create_chat(request, product_id):
    try:
        # Get the product
        product = Item.objects.get(id=product_id)
        
        # Check if user is trying to chat with themselves
        if request.user.id == product.created_by.id:
            return Response(
                {"error": "You cannot chat with yourself about your own product"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Try to get existing chat
        chat = ChatCustomer.objects.filter(
            Q(product=product) &
            (Q(buyer=request.user) | Q(seller=request.user))
        ).first()

        # If no chat exists, create a new one
        if not chat:
            chat = ChatCustomer.objects.create(
                product=product,
                buyer=request.user if request.user.id != product.created_by.id else None,
                seller=product.created_by if request.user.id != product.created_by.id else None
            )

        # Serialize and return the chat
        serializer = ChatSerializer(chat)
        return Response(serializer.data)

    except Item.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(f"Error in get_or_create_chat: {str(e)}")
        return Response(
            {"error": "Failed to initialize chat"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_messages(request, chat_id):
    try:
        chat = ChatCustomer.objects.get(id=chat_id)
        if request.user not in [chat.buyer, chat.seller]:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)

        messages = MessageCustomer.objects.filter(chat=chat)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    except ChatCustomer.DoesNotExist:
        return Response({"detail": "Chat not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request, chat_id):
    try:
        # Get the chat
        chat = ChatCustomer.objects.get(id=chat_id)
        
        # Verify user is part of the chat
        if request.user not in [chat.buyer, chat.seller]:
            return Response(
                {"error": "You are not authorized to send messages in this chat"},
                status=status.HTTP_403_FORBIDDEN
            )

        # Create the message
        message = MessageCustomer.objects.create(
            chat=chat,
            sender=request.user,
            content=request.data.get('content', '')
        )

        # Create notification for the other user
        receiver = chat.seller if request.user == chat.buyer else chat.buyer
        Notification.objects.create(
            user=receiver,
            message=message,
            product=chat.product,
            is_read=False
        )

        # Serialize and return the message
        serializer = MessageSerializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except ChatCustomer.DoesNotExist:
        return Response(
            {"error": "Chat not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(f"Error sending message: {str(e)}")
        return Response(
            {"error": "Failed to send message"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notifications(request):
    try:
        logger.info(f"Fetching notifications for user: {request.user.username}")
        notifications = Notification.objects.filter(user=request.user, is_read=False)
        logger.info(f"Found {notifications.count()} unread notifications")
        serializer = NotificationSerializer(notifications, many=True)
        logger.info(f"Serialized notifications: {serializer.data}")
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Error fetching notifications: {str(e)}")
        return Response(
            {"error": "Failed to fetch notifications"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_notification_read(request, notification_id):
    try:
        logger.info(f"Marking notification {notification_id} as read for user: {request.user.username}")
        notification = get_object_or_404(Notification, id=notification_id, user=request.user)
        notification.is_read = True
        notification.save()
        logger.info("Notification marked as read successfully")
        return Response({"status": "success"})
    except Exception as e:
        logger.error(f"Error marking notification as read: {str(e)}")
        return Response(
            {"error": "Failed to mark notification as read"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )