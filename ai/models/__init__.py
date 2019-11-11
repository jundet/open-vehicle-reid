from __future__ import absolute_import

from .VehicleNet import *


__model_factory = {
    'VehicleNet': VehicleNet,
}


def get_names():
    return list(__model_factory.keys())


def init_model(name, *args, **kwargs):
    if name not in list(__model_factory.keys()):
        raise KeyError("Unknown model: {}".format(name))
    return __model_factory[name](*args, **kwargs)