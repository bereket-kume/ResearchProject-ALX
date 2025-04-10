from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=255)
    class Meta:
        ordering =   ('name',)
        verbose_name_plural = 'Categories'
    def __str__(self):
        return self.name


class Item(models.Model):
    Category = models.ForeignKey(Category, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.FloatField()
    image = models.ImageField(upload_to='item_images',blank=True, null=True)
    is_sold = models.BooleanField(default = False)
    created_by = models.ForeignKey(User, related_name='items', on_delete= models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
    
class ChatCustomer(models.Model):
    product = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='chats')
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='buyer_chats')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='seller_chats')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'Chat for {self.product.name}'
    
class MessageCustomer(models.Model):
    chat = models.ForeignKey(ChatCustomer, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.sender.username}: {self.content[:50]}'

    class Meta:
        ordering = ['timestamp']

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Create notification for the receiver
        receiver = self.chat.seller if self.sender == self.chat.buyer else self.chat.buyer
        Notification.objects.create(
            user=receiver,
            message=self,
            product=self.chat.product
        )

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    message = models.ForeignKey(MessageCustomer, on_delete=models.CASCADE, related_name='notifications')
    product = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='notifications')
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f'Notification for {self.user.username} about {self.product.name}'

    class Meta:
        ordering = ['-timestamp']
