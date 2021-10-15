drop database tbs_assignment;
create database tbs_assignment;

\c tbs_assignment

-- Any form of ID, please enter in an 6 digit AlphaNumeric format Eg: AHF658

CREATE TABLE cashier
(
  cashier_ID VARCHAR(6) NOT NULL,
  cashier_name VARCHAR(30) NOT NULL,
  cashier_address VARCHAR(50) NOT NULL,
  PRIMARY KEY (cashier_ID)
);

CREATE TABLE theatre
(
  theatre_ID VARCHAR(6) NOT NULL,
  theatre_name INT NOT NULL,
  theatre_address VARCHAR(50) NOT NULL,
  PRIMARY KEY (theatre_ID)
);

CREATE TABLE customer
(
  cust_name INT NOT NULL,
  cust_ID VARCHAR(6) NOT NULL,
  email_id INT NOT NULL,
  phone_no INT NOT NULL,
  PRIMARY KEY (cust_ID)
);

CREATE TABLE movie
(
  movie_ID VARCHAR(6) NOT NULL,
  movie_name INT NOT NULL,
  director INT NOT NULL,
  release_date INT NOT NULL,
  PRIMARY KEY (movie_ID)
);

CREATE TABLE actors
(
  name VARCHAR(30) NOT NULL,
  Age INT NOT NULL,
  Sex CHAR(1) NOT NULL,
  movie_ID VARCHAR(6) NOT NULL,
  PRIMARY KEY (name, movie_ID),
  FOREIGN KEY (movie_ID) REFERENCES movie(movie_ID)
);

CREATE TABLE offer
(
  offer_ID VARCHAR(6) NOT NULL,
  discount INT NOT NULL,
  PRIMARY KEY (offer_ID)
);

CREATE TABLE show
(
  start_time INT NOT NULL,
  end_time INT NOT NULL,
  show_ID VARCHAR(6) NOT NULL,
  language INT NOT NULL,
  screen_no INT NOT NULL,
  show_date DATE NOT NULL,
  movie_ID VARCHAR(6) NOT NULL,
  theatre_ID VARCHAR(6) NOT NULL,
  PRIMARY KEY (show_ID),
  FOREIGN KEY (movie_ID) REFERENCES movie(movie_ID),
  FOREIGN KEY (theatre_ID) REFERENCES theatre(theatre_ID)
);

CREATE TABLE ticket
(
  ticket_no VARCHAR(6) NOT NULL,
  show_date INT NOT NULL,
  seat_no INT NOT NULL,
  price INT NOT NULL,
  show_timings INT NOT NULL,
  final_price INT NOT NULL,
  show_ID VARCHAR(6) NOT NULL,
  theatre_ID VARCHAR(6) NOT NULL,
  movie_ID VARCHAR(6) NOT NULL,
  cust_ID VARCHAR(6) NOT NULL,
  offer_ID VARCHAR(6) NOT NULL,
  PRIMARY KEY (ticket_no),
  FOREIGN KEY (show_ID) REFERENCES show(show_ID),
  FOREIGN KEY (theatre_ID) REFERENCES theatre(theatre_ID),
  FOREIGN KEY (movie_ID) REFERENCES movie(movie_ID),
  FOREIGN KEY (cust_ID) REFERENCES customer(cust_ID),
  FOREIGN KEY (offer_ID) REFERENCES offer(offer_ID)
);

CREATE TABLE sale
(
  cashier_ID VARCHAR(6) NOT NULL,
  ticket_no VARCHAR(6) NOT NULL,
  FOREIGN KEY (cashier_ID) REFERENCES cashier(cashier_ID),
  FOREIGN KEY (ticket_no) REFERENCES ticket(ticket_no),
  PRIMARY KEY (cashier_ID, ticket_no)
);

CREATE TABLE booking
(
  booking_date INT NOT NULL,
  cust_ID VARCHAR(6) NOT NULL,
  ticket_no VARCHAR(6) NOT NULL,
  FOREIGN KEY (cust_ID) REFERENCES customer(cust_ID),
  FOREIGN KEY (ticket_no) REFERENCES ticket(ticket_no),
  PRIMARY KEY (cust_ID, ticket_no)
);


