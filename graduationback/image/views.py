import re
import uuid
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from qiniu import Auth, BucketManager,put_file, etag
from image.models import Image
from image.serializers import ImageSerializer
from graduationback import settings


# Create your views here.

def init_qiniu():
    q = Auth(settings.QINIU_ACCESS_KEY, settings.QINIU_SECRET_KEY)
    return q

@api_view(['GET'])
# @new_login_check
def qiniu_uptoken(request):
    result = {}
    key = request.query_params.get('prefix')
    print(key)
    print("00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")
    if key == '':
        key = None
    if key:
        key = key + str(uuid.uuid4())

    q = init_qiniu()
    # 要上传的空间
    bucket_name = settings.QINIU_BUCKET_PUBLIC
    token = q.upload_token(bucket_name, key, 3600)
    print(token)
    result['key'] = key
    result['uptoken'] = token
    return Response(result)
