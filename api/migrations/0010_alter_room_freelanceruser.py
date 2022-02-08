# Generated by Django 4.0.2 on 2022-02-08 09:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_remove_room_participant_room_freelanceruser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='freelancerUser',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='freelancerUser', to=settings.AUTH_USER_MODEL),
        ),
    ]
