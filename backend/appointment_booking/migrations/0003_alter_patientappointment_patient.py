# Generated by Django 3.2.5 on 2021-08-15 06:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('appointment_booking', '0002_patientappointment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patientappointment',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patient', to='appointment_booking.patient'),
        ),
    ]