
CREATE TABLE Business_center (id Serial NOT NULL,
                                        name Text NOT NULL,
                                                  PRIMARY KEY (id));

;


INSERT INTO Business_center (name)
VALUES ('BC-Odessa');


CREATE TABLE Admin (id Serial NOT NULL,
                              password Text NOT NULL UNIQUE,
                                                     Business_center_id Integer NOT NULL DEFAULT 1 REFERENCES Business_center(id)) ;


INSERT INTO Admin (password)
VALUES ('password');


CREATE TABLE Guard (uuid Text NOT NULL,
                              name Text NOT NULL,
                                        last_name Text NOT NULL,
                                                       password Text NOT NULL UNIQUE,
                                                                              Business_center_id Integer NOT NULL DEFAULT 1 REFERENCES Business_center(id),
                                                                                                                                       face_descriptor Text NOT NULL UNIQUE,
                                                                                                                                                                     phone Text NOT NULL UNIQUE,
                                                                                                                                                                                         PRIMARY KEY (uuid));


CREATE TABLE Office (uuid Text NOT NULL,
                               name Text NOT NULL,
                                         Business_center_id Integer NOT NULL DEFAULT 1 REFERENCES Business_center(id),
                                                                                                  open Boolean NOT NULL DEFAULT false,
                                                                                                                                floor integer UNIQUE NOT NULL,
                                                                                                                                                     PRIMARY KEY (uuid));

;


INSERT INTO Office (uuid,name,floor)
VALUES ('o1',
        'Londonice',
        1), ('o2',
             'Sidneyice',
             2), ('o3',
                  'Tokioice',
                  3);


CREATE TABLE Worker
        (uuid Text NOT NULL UNIQUE,
                            name TEXT not null,
                                      last_name Text NOT NULL,
                                                     phone Text NOT NULL UNIQUE,
                                                                         Office_uuid Text NOT NULL REFERENCES Office(uuid) ON DELETE CASCADE ON UPDATE CASCADE,
                                                                                                                                                       face_descriptor Text NOT NULL UNIQUE,
                                                                                                                                                                                     PRIMARY KEY (uuid,
                                                                                                                                                                                                  face_descriptor)) ;


CREATE TABLE Terminal
        (uuid Text NOT NULL,
                   Cam_uuid Text NOT NULL,
                                 Office_uuid Text NOT NULL REFERENCES Office(uuid) ON DELETE CASCADE ON UPDATE CASCADE,
                                                                                                               PRIMARY KEY (uuid), UNIQUE(Cam_uuid, Office_uuid));

;


INSERT INTO Terminal (uuid, Cam_uuid, Office_uuid)
VALUES ('t1',
        'c1',
        'o1'), ('t2',
                'c1',
                'o2'), ('t3',
                        'c2',
                        'o2');


CREATE TABLE login_event
        (face_descriptor Text, moment Timestamp Without Time Zone NOT NULL,
                                                                  terminal_uuid Text NOT NULL REFERENCES Terminal(uuid) ON DELETE CASCADE ON UPDATE CASCADE,
                                                                                                                                                    success Boolean NOT NULL,
                                                                                                                                                                    PRIMARY KEY (terminal_uuid,
                                                                                                                                                                                 moment), UNIQUE(face_descriptor, terminal_uuid, moment)) ;

;


CREATE TABLE Other_event
        (message Text NOT NULL,
                      moment Timestamp Without Time Zone NOT NULL,
                                                         terminal_uuid Text NOT NULL REFERENCES Terminal(uuid) ON DELETE CASCADE ON UPDATE CASCADE,
                                                                                                                                           PRIMARY KEY (moment,
                                                                                                                                                        terminal_uuid));

;