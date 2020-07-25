import logging
import traceback

logger = logging.getLogger('django')
ERROR_CODE = {
    0: '成功',
    1: '记录已存在',
    2: '没有查询到指定记录',
    3: '需要登录',
    4: '参数无效',
    5: '用户未创建商店',
    6: '账号或密码无效',
    7: '无操作权限',
    8: '登陆过期',
    9: '名称已存在',
    10: '需指定父分类',
    11: '商品无库存',
    -1: '稍后再试'
}


def base_code_response():
    # msg = ERROR_CODE.get(code)
    # logger.warning(msg)
    return {
        # 'code': code,
        # 'msg': msg,
        'data': {}
    }

def default_response():
    return {
        'code': 0,
        'msg': 'success',
        'data': {}
    }
def invalid_parameters_response(e):
    code = 4
    msg = ERROR_CODE.get(code) + ': ' + str(e.get_codes())
    logger.warning('traceback.format_exc():%s' % traceback.format_exc())

    return {
        'code': code,
        'msg': msg,
        'data': {}
    }
def need_login_response():
    code = 3
    msg = ERROR_CODE.get(code)
    logger.warning(msg)
    return {
        'code': code,
        'msg': msg,
        'data': {}
    }