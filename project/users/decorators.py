from .responses import HttpResponseUnauthorized


def require_login(func):
    def func_wrapper(request):
        if request.user.is_authenticated:
            return func(request)
        else:
            return HttpResponseUnauthorized()