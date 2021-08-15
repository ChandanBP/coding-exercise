from django.db import models

# https://docs.djangoproject.com/en/3.2/topics/db/models/


class Patient(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)


class Appointment(models.Model):
    start_time = models.DateTimeField(auto_now=False)
    end_time = models.DateTimeField(auto_now=False)


class PatientAppointment(models.Model):
    appointment = models.ForeignKey(Appointment, related_name="appointment", on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, related_name="patient", on_delete=models.CASCADE)
    createdDateTime = models.DateTimeField(auto_now=True)

