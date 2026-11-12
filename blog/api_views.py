
from django.http import JsonResponse


def api_health(request):
    return JsonResponse({
        "status": "success",
        "message": "RUII Blog API is connected!",
        "application": "Django REST Backend"
    })
