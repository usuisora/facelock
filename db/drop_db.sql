DROP DATABASE if EXISTS bc_database;


drop table Worker
CREATE TABLE Worker (id Serial NOT NULL,
                               name TEXT not null last_name Text NOT NULL,
                                                                 phone_number Text NOT NULL UNIQUE,
                                                                                            Office_id Integer NOT NULL REFERENCES Office(id),
                                                                                                                                  face_descriptor Text NOT NULL UNIQUE,
                                                                                                                                                                PRIMARY KEY (id)) ;


insert into Worker(name, last_name, phone_number,office_id, face_descriptor)
values ('Test',
        'test',
        'nophone',
        1,
        'test-no-descriptor-12312312412')
select *
from worker