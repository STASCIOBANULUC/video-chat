from django.urls import re_path

from . import customer

websocket_urlpatterns = [
    re_path(r'', customer.Chat_Customer.as_asgi())

]