import traceback
import requests
from functools import wraps

import rest_framework
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
import logging
from utils.default_value import default_response, invalid_parameters_response, need_login_response
logger = logging.getLogger('django')

#
# def requests_exceptions_handle(func):
#     @wraps(func)
#     def wrapper(*args, **kwargs):
#         try:
#             return func(*args, **kwargs)
#         except requests.exceptions.ConnectTimeout as e:
#             return Response(third_party_services_unavailable_response())
#     return wrapper


def new_login_check(view_func):
    @wraps(view_func)
    @transaction.atomic
    def wrapper(*args, **kwargs):
        # fetch request
        if type(args[0]) is rest_framework.request.Request:  # for function under api_view
            request = args[0]
        elif type(args[1]) is rest_framework.request.Request:  # for function in ViewSet
            request = args[1]
        else:
            raise Exception('no request')

        print(dir(request))
        print(request.data)
        print("88888888888888888888888888888888888")

        if request.user is not None:
            try:
                return view_func(*args, **kwargs)
            except ValidationError as e:
                result = invalid_parameters_response(e)
                return Response(result)
            print(request.user)

            print("66666666666666666666666666666666")
        else:
            result = need_login_response()
            return Response(result)

    return wrapper