insert into Worker(name, last_name, phone, office_id, face_descriptor)
values ('Test',
        'test',
        'nophone',
        1,
        'test-no-descriptor-12312312412'),('Test2',
                                           'test2',
                                           'nophone2',
                                           2,
                                           'testface2');


insert into Guard (name, last_name, phone,PASSWORD, face_descriptor)
VALUES ('TestGuard',
        'Smith',
        'noguardphone',
        'gpass' 'gfaceid')
insert into other_event(message, moment, terminal_id)
values ('no massage',
        LOCALTIMESTAMP,
        1)
insert into login_event(terminal_id, moment,face_descriptor, success)
values (1,
        LOCALTIMESTAMP,
        'face2988821',
        True)