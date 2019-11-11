/*------- INSERT SQL---------*/
insert into `user` (`id`,`name`,`password`,`token`)
 values(<id>,<name>,<password>,<token>);

/*------- UPDATE SQL---------*/
update `user` SET 
    `id`=<value>,
    `name`=<value>,
    `password`=<value>,
    `token`=<value>
  where xxx = xxx;

/*------- SELECT SQL---------*/
select 
    `id`,
    `name`,
    `password`,
    `token`
  from `user`
  where xxx = xxx;

/*------- CREATE SQL---------*/
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `password` varchar(32) DEFAULT NULL,
  `token` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=gbk