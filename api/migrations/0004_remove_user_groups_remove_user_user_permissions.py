# Generated by Django 4.0.2 on 2022-02-17 09:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_user_groups_user_user_permissions'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='user',
            name='user_permissions',
        ),
    ]
