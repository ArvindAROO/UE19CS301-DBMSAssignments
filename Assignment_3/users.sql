\c tbs_assignment

-- revoke all on database tbs_assignment from cashier;
-- revoke all on database tbs_assignment from cashier;


-- drop user  cashier;
-- drop user  customer;

create user cashier with encrypted password 'cashier';
create user customer with encrypted password 'customer';

grant all on theatre, movie, ticket, shows, sale, booking to cashier;
grant select on theatre, movie, shows to customer;

--Uncomment to see all access privilages to the different users

select * from information_schema.role_table_grants where grantee = 'cashier';
select * from information_schema.role_table_grants where grantee = 'customer';

-- drop user cashier
-- drop user customer