import logging
import traceback
import uuid

import jwt
import time

from weixin import WXAPPAPI
from django.contrib.auth.models import User
from Login.models import Userinfo
from graduationback.settings import APP_SECRET, APP_ID,JWT_ISS,JWT_AUD,JWT_SECRET
# JWT_AUD, JWT_ISS, JWT_SECRET
logger = logging.getLogger('django')

api = WXAPPAPI(appid=APP_ID, app_secret=APP_SECRET)





def wxlogin(request):
    """
    weixin login

    return user instance if success
    """
    code = request.data.get('code')
    nickName = request.data['nickName']
    avatarUrl = request.data['avatarUrl']
    try:
        wx_info = api.exchange_code_for_session_key(code=code)
        logger.info('wx_info {}'.format(wx_info))
        open_id = wx_info.get('openid')
        session_key = wx_info.get('session_key')
        try:
            print("由用户的情况")
            instance = Userinfo.objects.get(open_id=open_id)
            instance.name = nickName
            instance.image = avatarUrl
            instance.save()
            logger.info('user exists in database')
            logger.info('open_id: {}'.format(open_id))
            return instance
        except Userinfo.DoesNotExist as e:
            instance = Userinfo.objects.create(nickname=nickName,open_id=open_id, session_key=session_key,name=nickName, image=avatarUrl)
            return instance

    except Exception as e:
        logger.error('！！！！！！！！！wxlogin exception！！！！！！！！！！！！！！！！')
        return None


def create_jwt_token(id):
    payload = {
        "iss": JWT_ISS,  # jwt签发者
        "iat": int(time.time()),  #jwt签发的时间
        "exp": int(time.time()) + 86400 * 30,  # jwt过期时间
        "aud": JWT_AUD,  # 接收jwt的一方
        "sub": str(id),  # jwt所面向的用户
    }

    try:
        token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')
        logger.info('create jwt success for user {}'.format(str(id)))
        return token
    except Exception as e:
        logger.error('create jwt token failed')
        logger.error(e)


def get_user_by_jwt(token):
    try:
        payload = jwt.decode(token, JWT_SECRET,
                             audience=JWT_AUD,
                             algorithms=['HS256'])
        sub = str(payload['sub'])
        if len(sub) < 10:
            instance = User.objects.get(id=sub)
        else:
            instance = User.objects.get(st_open_id=sub)
        logger.info('get user id = {} name = {} by jwt success'.format(sub, instance.name))

        return instance
    except Exception as e:
        logger.warning('get user by jwt failed')
        logger.warning(e)