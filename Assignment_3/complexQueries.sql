\c tbs_assignment

--Some more sorta simple queries
-- SELECT * from customer, booking where (customer.cust_id = booking.cust_id);

-- SELECT seat_no, final_price, screen_no from ticket, shows where ((ticket.show_id = shows.show_id) and (shows.screen_no = 3));

--select all customer whose price was more than $100 after applying offer
select * from customer where cust_id in (select cust_ID from ticket where ticket.final_price < ticket.price);
explain select * from customer where cust_id in (select cust_ID from ticket where ticket.final_price < ticket.price);

-- select all customer whose price was less than $100
select * from customer where cust_id=((select cust_id from customer) intersect (select cust_id from ticket where final_price<100));
explain select * from customer where cust_id=((select cust_id from customer) intersect (select cust_id from ticket where final_price<100));

-- Customer queries:
-- select customer who have availed 10% off of their ticket
select * from customer where cust_ID in (select cust_ID from ticket where offer_ID in (select offer_ID from offer where discount = 10));

-- select the maximum amount paid for a ticket and give details who paid it and for what movie
select * from movie where movie_id in (select movie_id from shows as S inner join (select show_id from ticket where final_price=(select max(final_price) from ticket)) as Q on Q.show_id=S.show_id);

-- Cashier queries:
-- select the cashier who has sold the ticket to a particular person 
select cashier_name from cashier as C,sale as S where C.cashier_id=S.cashier_id and ticket_no in (select ticket_no from ticket as T where T.cust_id in (select cust_id from customer where cust_name='Alex'));

-- select the cashier who has sold the ticket for a particular movie
select C.cashier_name from cashier as C where cashier_id in(select S.cashier_id from sale as S where S.ticket_no in (select ticket_no from ticket as T where T.show_id in ((select show_id from movie as M ,shows as S where movie_name='Fame' and M.movie_id=S.movie_id) union (select show_id from movie as M ,shows as S where movie_name='Flicker' and M.movie_id=S.movie_id))));

-- check the discount offered on the ticket of a particular customer
select discount from offer as O inner join (select offer_id from ticket as T inner join customer as C on C.cust_id=T.cust_id and C.cust_name='Alex') as Q on Q.offer_id=O.offer_id ;
 
-- Actor queries:
-- select the actors acting in a given movie
select actors.Actor_name, movie.movie_name from actors,movie where actors.movie_id=movie.movie_id and movie.movie_name = 'Do You Wanna Know a Secret?';

--Theatre queries:
--return the theatre details that runs a movie directed by some specific director
select * from theatre where theatre_id in (select theatre_id from shows where movie_id=((select movie_id from movie where director='Gentner') intersect (select movie_id from shows)));
