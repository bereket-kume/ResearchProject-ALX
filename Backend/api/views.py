from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Item, Category
from .serializers import CategorySerializer, ItemSerializer
# Create your views here.


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

@api_view(['POST', 'GET'])
def item_create(request):
    serializer = ItemSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
