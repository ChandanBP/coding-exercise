from rest_framework import serializers

from .models import Appointment, Patient,PatientAppointment

# Serializers define the API representation.
# https://www.django-rest-framework.org/api-guide/serializers/#serializers


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        read_only_fields = ["pk"]
        fields = ["pk", "first_name", "last_name"]


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        read_only_fields = ["pk"]
        fields = ["pk", "start_time", "end_time"]


class PatientAppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    appointment = AppointmentSerializer(read_only=True)

    class Meta:
        model = PatientAppointment
        read_only_fields = ["pk"]
        fields = ["pk", "appointment", "patient", "createdDateTime"]
