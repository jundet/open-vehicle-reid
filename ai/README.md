# Vehicle_Reid

Vehicle_Reid

基于 deep-person-reid，https://github.com/KaiyangZhou/deep-person-reid

## init

utils/upload_data.py

指定数据库地址参数

```python
host = "host"
user = "user"
password = "password"
database = "database"
```

## deep-person-reid


## Train
Training codes are implemented in
* trainer.py: train image model with combination of cross entropy loss and hard triplet loss.

For example, to train an image reid model using ResNet50 and cross entropy loss, run
```bash
python train_imgreid_xent.py -d VeRI_Wild -a VehicleNet --optim adam --lr 0.0003 --max-epoch 60 --stepsize 20 40 --train-batch 32 --test-batch 100 --save-dir --gpu-devices 0
```

To use multiple GPUs, you can set `--gpu-devices 0,1,2,3`.

To resume training, you can use `--resume path/to/.pth.tar` to load a checkpoint from which saved model weights and `start_epoch` will be used. Learning rate needs to be initialized carefully. If you just wanna load a pretrained model by discarding layers that do not match in size (e.g. classification layer), use '--load-weights path/to/.pth.tar' instead.

Please refer to the code for more details.
