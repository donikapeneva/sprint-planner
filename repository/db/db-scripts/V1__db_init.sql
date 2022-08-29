create database sprint_planner;

create table sprint_planner.`user` (
	`id` int not null auto_increment,
    `username` varchar(130) not null unique,
    `email` varchar(130) not null unique,
    `password` varchar(220) not null,
    `first_name` varchar(130) not null,
	`last_name` varchar(130) not null,
	`is_active` bit not null,
	`role` varchar(130) not null,
    primary key (`id`)
) ;


create table sprint_planner.`sprint` (
	`id` int not null auto_increment,
    `room_id` varchar(130) not null,
    `room_pass` varchar(130) not null,
    `status` varchar(220) not null,
    primary key (`id`)
) ;


create table sprint_planner.`task` (
	`id` int not null auto_increment,
    `public_id` varchar(100) not null,
    `epic_link` varchar(200),
    `task_link` varchar(200) not null,
    `short_description` varchar(500) not null,
    
    `is_approved_for_planning` bit not null DEFAULT 0,
    `is_included_in_sprint` bit not null DEFAULT 0,
    
    -- `assignee` int,
    `assignee` varchar(100),
    `story_points` int,

    `sprint_id` int not null,
    primary key (`id`),
    -- constraint `fk_assignee` foreign key (`assignee`) references `user` (`id`),
    constraint `fk_sprint_id` foreign key (`sprint_id`) references `sprint` (`id`)
) ;

create table sprint_planner.`comment` (
	`id` int not null auto_increment,
    `type` varchar(50) not null,
    `author` int not null,
    `task_id` int not null,
    `content` varchar(500) not null,
    `answer` varchar(500),
    primary key (`id`),
    constraint `fk_user_id` foreign key (`author`) references `user` (`id`),
    constraint `fk_task_id` foreign key (`task_id`) references `task` (`id`)
) ;

-- COMMIT;