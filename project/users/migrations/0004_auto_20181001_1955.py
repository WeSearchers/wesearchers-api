# Generated by Django 2.1.2 on 2018-10-01 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20180929_2229'),
    ]

    operations = [
        migrations.AlterField(
            model_name='institution',
            name='logo',
            field=models.ImageField(upload_to='media/institution/logo/'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(upload_to='media/profile/avatar/'),
        ),
    ]
