# Generated by Django 5.1 on 2024-08-29 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_superuser',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='university',
            field=models.CharField(choices=[('TDPU', 'Toshkent davlat pedagogika universiteti'), ('QDPI', "Qo'qon davlat pedagogika universiteti"), ('CHDPI', 'Chirchiq davlat pedagogika universiteti')], default=' ', max_length=10),
        ),
    ]
