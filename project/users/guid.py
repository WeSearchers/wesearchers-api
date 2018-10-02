import hashlib
import random


def new_guid():
    return hashlib.sha1(str(random.random()).encode('utf-8')).hexdigest()
