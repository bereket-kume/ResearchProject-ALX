# Generated by Django 5.1.2 on 2025-04-10 13:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_messagecustomer_is_read_notification'),
    ]

    operations = [
        migrations.RenameField(
            model_name='item',
            old_name='descripation',
            new_name='description',
        ),
    ]
