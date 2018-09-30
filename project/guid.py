import hashlib
import random


def new_guid():
    hashlib.sha1(str(random.random()).encode('utf-8')).hexdigest()
