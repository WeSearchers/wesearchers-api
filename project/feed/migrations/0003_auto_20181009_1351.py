# Generated by Django 2.1.1 on 2018-10-09 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feed', '0002_auto_20181009_1339'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='url',
            field=models.URLField(null=True),
        ),
        migrations.AlterField(
            model_name='article',
            name='media_url',
            field=models.URLField(null=True),
        ),
    ]
