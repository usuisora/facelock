
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


CREATE TABLE Guard (id Serial NOT NULL,
                              name Text NOT NULL,
                                        last_name Text NOT NULL,
                                                       password Text NOT NULL UNIQUE,
                                                                              Business_center_id Integer NOT NULL DEFAULT 1 REFERENCES Business_center(id),
                                                                                                                                       face_descriptor Text NOT NULL UNIQUE,
                                                                                                                                                                     phone Text NOT NULL UNIQUE,
                                                                                                                                                                                         PRIMARY KEY (id));


CREATE TABLE Office (id Serial NOT NULL,
                               name Text NOT NULL,
                                         Business_center_id Integer NOT NULL DEFAULT 1 REFERENCES Business_center(id),
                                                                                                  open Boolean NOT NULL DEFAULT false,
                                                                                                                                floor serial UNIQUE NOT NULL,
                                                                                                                                                    PRIMARY KEY (id));

;


INSERT INTO Office (name)
VALUES ('Londonice'), ('Sidneyice'), ('Tokioice');


CREATE TABLE Worker (id Serial NOT NULL,
                               name TEXT not null,
                                         last_name Text NOT NULL,
                                                        phone Text NOT NULL UNIQUE,
                                                                            Office_id Integer NOT NULL REFERENCES Office(id),
                                                                                                                  face_descriptor Text NOT NULL UNIQUE,
                                                                                                                                                PRIMARY KEY (id)) ;


CREATE TABLE Terminal (id Serial NOT NULL,
                                 Office_id integer NOT NULL REFERENCES Office(id),
                                                                       PRIMARY KEY (id));

;


INSERT INTO Terminal (Office_id)
VALUES (1),(2),(3);


CREATE TABLE login_event (face_descriptor Text, terminal_id Integer NOT NULL REFERENCES Terminal(id),
                                                                                        moment Timestamp Without Time Zone NOT NULL,
                                                                                                                           success Boolean NOT NULL,
                                                                                                                                           PRIMARY KEY (face_descriptor,
                                                                                                                                                        moment));

;


CREATE TABLE Other_event (id Serial NOT NULL,
                                    message Text NOT NULL,
                                                 moment Timestamp Without Time Zone NOT NULL,
                                                                                    terminal_id Integer NOT NULL REFERENCES Terminal(id),
                                                                                                                            PRIMARY KEY (id));

;