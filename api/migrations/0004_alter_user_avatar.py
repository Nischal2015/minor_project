# Generated by Django 3.2.5 on 2022-02-06 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default='nepal.png', null=True, upload_to=''),
        ),
    ]
