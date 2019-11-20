# Vehicle_Reid

Vehicle_Reid

## init

utils/upload_data.py

指定数据库地址参数

```python
host = "host"
user = "user"
password = "password"
database = "database"
```

## datasets

VERI-Wild：为简化车辆信息的读取，车辆信息与编号已经拼接并另存为X_info.txt

## train
```bash
python trainer.py -d VeRI_Wild -a VehicleNet --optim adam --lr 0.0003 --max-epoch 60 --stepsize 20 40 --train-batch 32 --test-batch 100 --save-dir --gpu-devices 0
```

 参考[deep-person-reid](https://github.com/KaiyangZhou/deep-person-reid)