import logging

from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import routers, serializers, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Appointment, Patient, PatientAppointment
from .serializers import AppointmentSerializer, PatientSerializer
from .serializers import PatientAppointmentSerializer

logger = logging.getLogger(__name__)

# ViewSets define the view behavior.
# https://www.django-rest-framework.org/api-guide/viewsets/#viewsets


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class PatientAppointmentViewSet(viewsets.ModelViewSet):
    queryset = PatientAppointment.objects.select_related('patient','appointment').all()
    serializer_class = PatientAppointmentSerializer

# Since single appointment resource can be used only once for any patient
# A separate model called PatientAppointment was created which has references to appointment and patient resource
# By doing so user experience is enhanced as we need not to create appointment resource first and then patient resource
class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    @action(detail=True, methods=["patch"])
    def book(self, request, pk=None):
        appointment = Appointment.objects.get(pk=pk)
        patient = Patient.objects.get(pk=request.data.get("patient_pk"))
        logger.info("Booking appointment %s for patient %s", appointment.pk, patient.pk)

        if self.checkappointmentexists(appointment):
            return Response("This slot is already booked",status=status.HTTP_409_CONFLICT)

        patientAppointment = PatientAppointment.objects.create(appointment=appointment,patient=patient)

        serializer = PatientAppointmentSerializer(patientAppointment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def checkappointmentexists(self,appointment):
        patientAppointment = PatientAppointment.objects.filter(appointment=appointment)
        return True if patientAppointment else False
