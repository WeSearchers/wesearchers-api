# Generated by Django 2.1.1 on 2018-10-03 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feed', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vote',
            name='score',
            field=models.IntegerField(),
        ),
    ]
