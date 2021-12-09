CREATE TABLE cashier
(
  cashier_ID VARCHAR(6) NOT NULL ,
  cashier_name VARCHAR(30) NOT NULL,
  cashier_address VARCHAR(50) NOT NULL,
  PRIMARY KEY (cashier_ID)
);

CREATE TABLE theatre
(
  theatre_ID VARCHAR(6) NOT NULL ,
  theatre_name VARCHAR(25) NOT NULL,
  theatre_address VARCHAR(50) NOT NULL,
  seats_available INT CHECK(seats_available >= 0),
  PRIMARY KEY (theatre_ID)
);

CREATE TABLE customer
(
  cust_name VARCHAR(15) NOT NULL ,
  cust_ID VARCHAR(6) NOT NULL,
  email_id VARCHAR(50) NOT NULL,
  phone_no VARCHAR(10) NOT NULL,
  PRIMARY KEY (cust_ID)
);

CREATE TABLE movie
(
  movie_ID VARCHAR(6) NOT NULL ,
  movie_name VARCHAR(50) NOT NULL,
  director VARCHAR(25) NOT NULL,
  release_date VARCHAR(10) NOT NULL,
  PRIMARY KEY (movie_ID)
);

CREATE TABLE actors
(
  Actor_name VARCHAR(30) NOT NULL,
  Age INT NOT NULL,
  Sex CHAR(1) NOT NULL,
  movie_ID VARCHAR(6) NOT NULL,
  PRIMARY KEY (Actor_name, movie_ID),
  FOREIGN KEY (movie_ID) REFERENCES movie(movie_ID) on update cascade on delete cascade 
);

CREATE TABLE offer
(
  offer_ID VARCHAR(6) NOT NULL ,
  discount INT NOT NULL,
  PRIMARY KEY (offer_ID)
);

CREATE TABLE shows
(
  start_time VARCHAR(5) NOT NULL,
  end_time VARCHAR(5) NOT NULL,
  show_ID VARCHAR(6) NOT NULL ,
  language INT NOT NULL,
  screen_no INT NOT NULL,
  show_date varchar(10) NOT NULL,
  movie_ID VARCHAR(6) NOT NULL,
  theatre_ID VARCHAR(6) NOT NULL,
  PRIMARY KEY (show_ID),
  FOREIGN KEY (movie_ID) REFERENCES movie(movie_ID) on update cascade on delete cascade,
  FOREIGN KEY (theatre_ID) REFERENCES theatre(theatre_ID) on update cascade on delete cascade
);

CREATE TABLE ticket
(
  ticket_no VARCHAR(6) NOT NULL ,
  seat_no INT NOT NULL,
  price INT NOT NULL,
  offer_ID VARCHAR(6) NOT NULL,
  final_price INT NOT NULL,
  show_ID VARCHAR(6) NOT NULL,
  cust_ID VARCHAR(6) NOT NULL,
  theatre_ID VARCHAR(6) NOT NULL,
  PRIMARY KEY (ticket_no),
  FOREIGN KEY (show_ID) REFERENCES shows(show_ID) on update cascade on delete cascade,
  FOREIGN KEY (cust_ID) REFERENCES customer(cust_ID),
  FOREIGN KEY (offer_ID) REFERENCES offer(offer_ID) on update cascade on delete cascade,
  FOREIGN KEY (theatre_ID) REFERENCES theatre(theatre_ID) on update cascade on delete cascade
);

CREATE TABLE sale
(
  cashier_ID VARCHAR(6) NOT NULL,
  ticket_no VARCHAR(6) NOT NULL,
  theatre_ID VARCHAR(6) NOT NULL,
  FOREIGN KEY (cashier_ID) REFERENCES cashier(cashier_ID),
  FOREIGN KEY (ticket_no) REFERENCES ticket(ticket_no) on update cascade on delete cascade,
  FOREIGN KEY (theatre_ID) REFERENCES theatre(theatre_ID) on update cascade on delete cascade,
  PRIMARY KEY (cashier_ID, ticket_no , theatre_id)
);

CREATE TABLE booking
(
  booking_date VARCHAR(10) NOT NULL,
  cust_ID VARCHAR(6) NOT NULL,
  ticket_no VARCHAR(6) NOT NULL,
  theatre_ID VARCHAR(6) NOT NULL,
  FOREIGN KEY (cust_ID) REFERENCES customer(cust_ID),
  FOREIGN KEY (ticket_no) REFERENCES ticket(ticket_no) on update cascade on delete cascade,
  FOREIGN KEY (theatre_ID) REFERENCES theatre(theatre_ID) on update cascade on delete cascade,
  PRIMARY KEY (cust_ID, ticket_no,theatre_ID)
);


