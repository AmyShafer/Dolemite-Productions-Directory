INSERT INTO departments (name) 
VALUES ("Crew"),
       ("Cast"),
       ("Martial Arts"),
       ("Investors");

INSERT INTO roles (title, salary, department_id)
VALUES ("Actor", 250, 2),
       ("Assistant Cameraman", 250, 1),
       ("Assistant Director", 250, 1),
       ("Backer", 500, 4),
       ("Cinematographer", 500, 1),
       ("Director", 3000, 1),
       ("Editor", 2000, 1),
       ("Fight Choreographer", 750, 3),
       ("Gaffer", 700, 1),
       ("Grip", 600, 1),
       ("Lightweight Karate Champion", 500, 3),
       ("Make-up", 600, 1),
       ("Martial Arts Assistant Director", 300, 3),
       ("Master Samurai Swordsman", 400, 3),
       ("Music Arranger", 500, 1),
       ("Music Consultant", 250, 1),
       ("Negative Editor", 600, 1),
       ("Producer", 500, 1),
       ("Production Assistant", 250, 1),
       ("Production Manager", 200, 1),
       ("Set Decorator", 100, 1),
       ("Sound Editor", 450, 1),
       ("Sound Engineer", 600, 1),
       ("Special Effects", 500, 1),
       ("Writer", 700, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Malaika", "Ahraam", 1, 4),
       ("Al", "Banks", 1, 5),
       ("Vince", "Barbi", 1, 6),
       ("Joseph", "Bihari", 4, NULL),
       ("Julius", "Bihari", 4, NULL),
       ("Lester", "Bihari", 4, NULL),
       ("Ted", "Brinson", 16, 6),
       ("Marie", "Carter", 1, 5),
       ("Junior", "Cranberry", 1, 4),
     
