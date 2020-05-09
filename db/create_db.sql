
CREATE TABLE Business_center (id Serial NOT NULL,
                                        name Text NOT NULL,
                                                  PRIMARY KEY (id));

;


INSERT INTO Business_center (name)
VALUES ('BC-Odessa');


CREATE TABLE Guard (id Serial NOT NULL,
                              name Text NOT NULL,
                                        password Text NOT NULL,
                                                      Business_center_id Integer NOT NULL DEFAULT 1,
                                                                                                  PRIMARY KEY (id));

;


INSERT INTO Guard (name, password)
VALUES ('Arnoldo',
        '1234'),('Uventus',
                 '4321');


CREATE TABLE Office (id Serial NOT NULL,
                               name Text NOT NULL,
                                         Business_center_id Integer NOT NULL DEFAULT 1,
                                                                                     open Boolean NOT NULL DEFAULT false,
                                                                                                                   floor serial UNIQUE NOT NULL,
                                                                                                                                       PRIMARY KEY (id));

;


INSERT INTO Office (name)
VALUES ('Londonice'), ('Sidneyice'), ('Tokioice');


CREATE TABLE Worker (id Serial NOT NULL,
                               last_name Text NOT NULL,
                                              phone_number Text NOT NULL UNIQUE,
                                                                         Office_id Integer NOT NULL,
                                                                                           face_descriptor Text NOT NULL UNIQUE,
                                                                                                                         field Text NOT NULL,
                                                                                                                                    PRIMARY KEY (id)) ;


CREATE TABLE Terminal (id Serial NOT NULL,
                                 Office_id integer NOT NULL,
                                                   PRIMARY KEY (id));

;


INSERT INTO Terminal (Office_id)
VALUES (1),(2),(3);


CREATE TABLE login_event (face_descriptor Text, terminal_id Integer NOT NULL,
                                                                    moment Timestamp Without Time Zone NOT NULL,
                                                                                                       success Boolean NOT NULL,
                                                                                                                       PRIMARY KEY (face_descriptor,
                                                                                                                                    moment));

;


CREATE TABLE Other_event (id Serial NOT NULL,
                                    message Text NOT NULL,
                                                 moment Timestamp Without Time Zone NOT NULL,
                                                                                    terminal_id Integer NOT NULL,
                                                                                                        PRIMARY KEY (id));

;