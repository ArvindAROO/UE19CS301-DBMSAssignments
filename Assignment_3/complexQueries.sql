\c tbs_assignment

-- SELECT * from customer, booking where (customer.cust_id = booking.cust_id);

-- SELECT seat_no, final_price, screen_no from ticket, shows where ((ticket.show_id = shows.show_id) and (shows.screen_no = 3));

--select all customer whose price was more than $100
select * from customer, ticket where (ticket.final_price > 100 and ticket.cust_id = customer.cust_id);

-- select all customer whose price was less than $100