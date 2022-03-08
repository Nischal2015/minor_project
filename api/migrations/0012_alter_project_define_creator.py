# Generated by Django 4.0.2 on 2022-03-07 03:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_project_define_creator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project_define',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
    ]
