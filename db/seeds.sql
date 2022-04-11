INSERT INTO departments (id, department_name) 
VALUES (1, "Crew"),
       (2, "Cast"),
       (3, "Martial Arts"),
       (4, "Investors");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Actor", 250, 2),
       (2, "Assistant Cameraman", 250, 1),
       (3, "Assistant Director", 250, 1),
       (4, "Backer", 500, 4),
       (5, "Cinematographer", 500, 1),
       (6, "Director", 3000, 1),
       (7, "Editor", 2000, 1),
       (8, "Fight Choreographer", 750, 3),
       (9, "Gaffer", 700, 1),
       (10, "Grip", 600, 1),
       (11, "Lightweight Karate Champion", 500, 3),
       (12, "Make-up", 600, 1),
       (13, "Martial Arts Assistant Director", 300, 3),
       (14, "Master Samurai Swordsman", 400, 3),
       (15, "Music Arranger", 500, 1),
       (16, "Music Consultant", 250, 1),
       (17, "Negative Editor", 600, 1),
       (18, "Producer", 500, 1),
       (19, "Production Assistant", 250, 1),
       (20, "Production Manager", 200, 1),
       (21, "Set Decorator", 100, 1),
       (22, "Sound Editor", 450, 1),
       (23, "Sound Engineer", 600, 1),
       (24, "Special Effects", 500, 1),
       (25, "Writer", 700, 1);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Malaika", "Ahraam", 1, 29),  
       (2, "Al", "Banks", 1, 29),    
       (3, "Vince", "Barbi", 1, 29), 
       (4, "Joseph", "Bihari", 4, NULL),
       (5, "Julius", "Bihari", 4, NULL),
       (6, "Lester", "Bihari", 4, NULL),
       (7, "Ted", "Brinson", 16, 15),
       (8, "Marie", "Carter", 1, 29),
       (9, "Junior", "Cranberry", 1, 29),
       (10, "Norval", "Crutcher", 22, NULL),
       (11, "Gene", "Davis", 8, 35),
       (12, "Von", "Dutch", 24, 40),
       (13, "Warde", "Egan", 1, 29),
       (14, "Mother", "Fear", 1, 29),
       (15, "Bobbie", "George", 2, 40),
       (16, "James", "Gough", 13, 35),
       (17, "Timothy", "Grace", 10, 40),
       (18, "John Ashley", "Hamilton", 3, 40),
       (19, "Josephine", "Harris", 1, 29),
       (20, "Michael", "Hereford", 2, 40),
       (21, "Howard", "Jackson", 11, 35),
       (22, "Claudia", "Jackson", 20, 29),
       (23, "Jerry", "Jones", 25, 32),
       (24, "John", "Kirkland", 9, 40),
       (25, "Jack", "LaMantiain", 17, 28),
       (26, "Jean", "Lewis", 19, 29),
       (27, "Princess", "Lilio", 1, 29),
       (28, "Rex", "Lipton", 7, 32),
       (29, "D’Urville", "Martin", 6, 32),
       (30, "Hugh", "McDonald", 13, 35),
       (31, "Carmella", "Di Milo", 1, 29),
       (32, "Rudy Ray", "Moore", 18, 5),
       (33, "Eric", "Nero", 13, 35),
       (34, "Randy", "Ornelas", 10, 40),
       (35, "Curtis", "Pulliam", 13, 29),
       (36, "Hy", "Pyke", 1, 29),
       (37, "Lady", "Reed", 1, 29),
       (38, "Marvin", "Reese", 21, 29),
       (39, "George", "Selin", 10, 40),
       (40, "Nicholas", "Josef von Sternberg", 5, 29),
       (41, "Bruce", "Stevens", 1, 29),
       (42, "John", "Wagner", 10, 40),
       (43, "Harry", "Wollman", 24, 40),
       (44, "Arthur", "Wright", 16, 32),
       (45, "Carol", "Yasunaga", 23, 40);
