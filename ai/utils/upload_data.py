# -*- coding: UTF-8 -*-
import pymysql
import time, datetime
# sql
host = "host"
user = "user"
password = "password"
database = "database"
# user
userid = 2


# trianing data
def updateloss(modelid, epoch, loss):
    if modelid != 0:
        try:
            db = pymysql.connect(host, user, password, database, charset='utf8')
            cursor = db.cursor()
            sql = "INSERT INTO model_train (userid,modelid,epoch,loss) VALUES (%s,%s,%s,%s)"
            cursor.execute(sql, (userid,modelid, epoch, loss))
            cursor.close()
            db.close()
        except:
            print("x")


# test data
def updatetest(modelid, epoch, mAP, rank1, rank5, rank10, rank20):
    if modelid != 0:
        try:
            db = pymysql.connect(host, user, password, database,charset='utf8')
            cursor = db.cursor()
            sql = "INSERT INTO model_test (userid,modelid,epoch,map,rank1,rank5,rank10,rank20) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
            cursor.execute(sql, (userid,modelid, epoch, mAP, rank1, rank5, rank10, rank20))
            db.commit()
            db.close()
        except:
            print("x")


# model data
def updatemodel(model_name, learn_rate, stepsize, gamma, loss, data, height, width,seqlen,batch,other):
    try:
        ticks = int(time.time() * 1000)
        db = pymysql.connect(host, user, password, database,charset='utf8')
        cursor = db.cursor()
        sql = "INSERT INTO VehicleModels (userid,model,learnrate, stepsize, gamma,loss,data,height,width,seqlen,batch,other,time) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        cursor.execute(sql, (userid,model_name, learn_rate, stepsize, gamma, loss, data, height, width,seqlen,batch,other,ticks))
        id = cursor.lastrowid
        db.commit()
        db.close()
        return id
    except:
        print("x")
        return 0


# model best rank
def updaterank(model_id, rank1):
    if model_id != 0:
        try:
            db = pymysql.connect(host, user, password, database,charset='utf8')
            cursor = db.cursor()
            sql = "UPDATE `VehicleModels` SET `rank1` = %s WHERE `id` = %s"
            cursor.execute(sql, (rank1, model_id))
            id = cursor.lastrowid
            db.commit()
            db.close()
            return id
        except:
            print("x")
