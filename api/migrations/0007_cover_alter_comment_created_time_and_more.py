# Generated by Django 4.1.7 on 2023-05-23 06:54

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_novel_novellist_alter_comment_created_time_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cover',
            fields=[
                ('cover_id', models.AutoField(primary_key=True, serialize=False, verbose_name='封面ID')),
                ('cover_link', models.CharField(max_length=1023, verbose_name='封面网址')),
            ],
            options={
                'verbose_name_plural': '推荐专题',
                'db_table': 'cover',
            },
        ),
        migrations.AlterField(
            model_name='comment',
            name='created_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 5, 23, 6, 54, 55, tzinfo=datetime.timezone.utc), verbose_name='评论时间'),
        ),
        migrations.AlterField(
            model_name='history',
            name='history_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 5, 23, 6, 54, 55, tzinfo=datetime.timezone.utc), verbose_name='历史时间'),
        ),
        migrations.AlterField(
            model_name='novel',
            name='pa_state',
            field=models.IntegerField(default=0, verbose_name='爬取状态'),
        ),
        migrations.CreateModel(
            name='Mail',
            fields=[
                ('mail_id', models.AutoField(primary_key=True, serialize=False, verbose_name='邮箱ID')),
                ('content', models.CharField(max_length=1023, verbose_name='邮件内容')),
                ('mail_time', models.DateTimeField(default=datetime.datetime(2023, 5, 23, 6, 54, 55, tzinfo=datetime.timezone.utc), verbose_name='邮件时间')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
            options={
                'verbose_name_plural': '邮件',
                'db_table': 'mail',
            },
        ),
    ]
