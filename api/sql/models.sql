/*------- INSERT SQL---------*/
insert into `models` (`id`,`userid`,`model`,`learnrate`,`stepsize`,`gamma`,`loss`,`data`,`height`,`width`,`seqlen`,`batch`,`rank1`,`other`,`time`)
 values(<id>,<userid>,<model>,<learnrate>,<stepsize>,<gamma>,<loss>,<data>,<height>,<width>,<seqlen>,<batch>,<rank1>,<other>,<time>);

/*------- UPDATE SQL---------*/
update `models` SET 
    `id`=<value>,
    `userid`=<value>,
    `model`=<value>,
    `learnrate`=<value>,
    `stepsize`=<value>,
    `gamma`=<value>,
    `loss`=<value>,
    `data`=<value>,
    `height`=<value>,
    `width`=<value>,
    `seqlen`=<value>,
    `batch`=<value>,
    `rank1`=<value>,
    `other`=<value>,
    `time`=<value>
  where xxx = xxx;

/*------- SELECT SQL---------*/
select 
    `id`,
    `userid`,
    `model`,
    `learnrate`,
    `stepsize`,
    `gamma`,
    `loss`,
    `data`,
    `height`,
    `width`,
    `seqlen`,
    `batch`,
    `rank1`,
    `other`,
    `time`
  from `models`
  where xxx = xxx;

/*------- CREATE SQL---------*/
CREATE TABLE `models` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `model` text NOT NULL,
  `learnrate` float DEFAULT NULL,
  `stepsize` int(11) DEFAULT NULL,
  `gamma` float DEFAULT NULL,
  `loss` text,
  `data` text,
  `height` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `seqlen` int(11) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `rank1` float DEFAULT NULL,
  `other` text,
  `time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=382 DEFAULT CHARSET=gbk