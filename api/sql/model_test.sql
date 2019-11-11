/*------- INSERT SQL---------*/
insert into `model_test` (`id`,`userid`,`modelid`,`epoch`,`map`,`rank1`,`rank5`,`rank10`,`rank20`)
 values(<id>,<userid>,<modelid>,<epoch>,<map>,<rank1>,<rank5>,<rank10>,<rank20>);

/*------- UPDATE SQL---------*/
update `model_test` SET 
    `id`=<value>,
    `userid`=<value>,
    `modelid`=<value>,
    `epoch`=<value>,
    `map`=<value>,
    `rank1`=<value>,
    `rank5`=<value>,
    `rank10`=<value>,
    `rank20`=<value>
  where xxx = xxx;

/*------- SELECT SQL---------*/
select 
    `id`,
    `userid`,
    `modelid`,
    `epoch`,
    `map`,
    `rank1`,
    `rank5`,
    `rank10`,
    `rank20`
  from `model_test`
  where xxx = xxx;

/*------- CREATE SQL---------*/
CREATE TABLE `model_test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `modelid` int(11) DEFAULT NULL,
  `epoch` int(11) DEFAULT NULL,
  `map` float DEFAULT NULL,
  `rank1` float DEFAULT NULL,
  `rank5` float DEFAULT NULL,
  `rank10` float DEFAULT NULL,
  `rank20` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2758 DEFAULT CHARSET=gbk