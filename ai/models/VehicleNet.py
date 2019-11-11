import torchvision
import torch.nn as nn
from torch.nn import functional as F

__all__ = ['VehicleNet']


class VehicleNet(nn.Module):

    def __init__(self, num_classes, loss={'xent', 'htri'}):
        super(VehicleNet, self).__init__()
        self.class_nums = num_classes
        resnet50 = torchvision.models.resnet50()
        self.base = nn.Sequential(*list(resnet50.children())[:-2])
        self.classifier = nn.Linear(2048, self.class_nums)
        self.loss=loss

    def forward(self, x):
        x = self.base(x)
        x = F.avg_pool2d(x, x.size()[2:])
        features = x.view(x.size(0), -1)
        if not self.training:
            return features
        vehicle_id = self.classifier(features)

        if self.loss == {'xent'}:
            return vehicle_id
        elif self.loss == {'xent', 'htri'}:
            return vehicle_id, features
        else:
            raise KeyError("Unsupported loss: {}".format(self.loss))

