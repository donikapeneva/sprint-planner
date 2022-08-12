insert into sprint_planner.`user`
(username, email, password, first_name, last_name, is_active, role)
values ('master.user', 'master@test.com', 'asd', 'master', 'user', 1, 'master');

insert into sprint_planner.`user`
(username, email, password, first_name, last_name, is_active, role)
values ('test.user', 'tester@test.com', 'asd', 'test', 'user', 1, 'team member');

insert into sprint_planner.`sprint`
(room_id, room_pass, status)
values ('Sprint 1', 'test', 'NEW');