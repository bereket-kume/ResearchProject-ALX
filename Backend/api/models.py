from django.db import models
from django.contrib.auth.models import User
# Create your models here.


#category of  element user can add
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
    descripation = models.TextField(blank=True, null=True)
    price = models.FloatField()
    image = models.ImageField(upload_to='item_images',blank=True, null=True)
    is_sold = models.BooleanField(default = False)
    created_by = models.ForeignKey(User, related_name='items', on_delete= models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name
    
class Message(models.Model):
    product = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('product', 'sender', 'receiver'),)
        ordering = ['timestamp']

    def save(self, *args, **kwargs):
        if self.sender == self.receiver:
            raise ValueError("Sender and receiver cannot be the same user.")
        super(Message, self).save(*args, **kwargs)

    def __str__(self):
        return f'Message from {self.sender} to {self.receiver} about {self.product}'