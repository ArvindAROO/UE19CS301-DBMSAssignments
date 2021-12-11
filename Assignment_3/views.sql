\c tbs_assignment

--create multiple views of the database

 drop view IF EXISTS *;
--customer view
create view customer_view as select cust_name, email_id, phone_no from customer;
select * from customer_view;

--sale view
create view cashiers_sale_view as select cashier_name, cashier_address, cashier.cashier_ID, ticket.ticket_no, seat_no, price, final_price from cashier, sale, ticket where (sale.cashier_ID = cashier.cashier_ID and sale.ticket_no = ticket.ticket_no);
select * from cashiers_sale_view;

--theatre view
create view theatre_view as select theatre_name, theatre_address, theatre.theatre_ID, movie_name, show_date, start_time, end_time, language from theatre, shows, movie where (theatre.theatre_ID = shows.theatre_ID and shows.movie_ID = movie.movie_ID);
select * from theatre_view;

--movie view
create view movie_view as select movie_name, director, release_date, Actor_name, Sex, Age, show_date, screen_no, start_time, end_time from movie, actors, shows where (movie.movie_ID = shows.movie_ID and actors.movie_ID = movie.movie_ID);
select * from movie_view;

drop view customer_view;
drop view cashiers_sale_view;
drop view theatre_view;
drop view movie_view;