insert into Worker(uuid, name, last_name, phone, office_id, face_descriptor)
values ('Test',
        'test',
        'nophone',
        'o1',
        'test-no-descriptor-12312312412'),('Test2',
                                           'test2',
                                           'nophone2',
                                           'o2',
                                           'testface2');


insert into Guard (uuid, name, last_name, phone,PASSWORD, face_descriptor)
VALUES ('g1',
        'TestGuard',
        'Smith',
        'noguardphone',
        'gpass' 'gfaceid');


insert into other_event(message, moment, terminal_uuid)
values (' Результат возвращает промис, содержащий поток, который  состоит из треков (дорожек), содержащих требуемые медиа типы',
        LOCALTIMESTAMP,
        't2')
insert into login_event(terminal_uuid, moment,face_descriptor, success)
values ('t2',
        LOCALTIMESTAMP,
        'face298882AS1',
        True)