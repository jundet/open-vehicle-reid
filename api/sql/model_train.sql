/*------- INSERT SQL---------*/
insert into `model_train` (`id`,`userid`,`modelid`,`epoch`,`loss`,`acc`)
 values(<id>,<userid>,<modelid>,<epoch>,<loss>,<acc>);

/*------- UPDATE SQL---------*/
update `model_train` SET 
    `id`=<value>,
    `userid`=<value>,
    `modelid`=<value>,
    `epoch`=<value>,
    `loss`=<value>,
    `acc`=<value>
  where xxx = xxx;

/*------- SELECT SQL---------*/
select 
    `id`,
    `userid`,
    `modelid`,
    `epoch`,
    `loss`,
    `acc`
  from `model_train`
  where xxx = xxx;

/*------- CREATE SQL---------*/
CREATE TABLE `model_train` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `modelid` int(11) DEFAULT NULL,
  `epoch` int(11) DEFAULT NULL,
  `loss` float DEFAULT NULL,
  `acc` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=196855 DEFAULT CHARSET=gbk