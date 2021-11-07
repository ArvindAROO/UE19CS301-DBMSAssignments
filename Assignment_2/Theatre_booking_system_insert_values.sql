\c tbs_assignment
-- INSERTING CASHIER
INSERT into cashier values ('A7VGBD','John', '4th Cross, Banashankari');
INSERT into cashier values ('JBAGD3','Brown', 'Banglore towers, RR Nagar');
INSERT into cashier values ('8HNFGB','Steve', 'No 169, Majestic');
INSERT into cashier values ('6HDIA','Harvey', '450 Stone, Satelitte town');
INSERT into cashier values ('ABJD82','Richard', '390 Block, Yelahanka');
INSERT into cashier values ('AJNF5Y','Nelson', '7th main, JP nagar');

--Inserting threatres

INSERT into theatre values ('A7VGBD','Banglore cinemas', 'Banglore Cinemas, Banglore');
INSERT into theatre values ('AHSA8A','Central Movies', 'City Cetral Mall, Banglore');
INSERT into theatre values ('8UHD7A','Fun Zone', 'Jayanagar, 4th cross');

--inserting customer values
INSERT into customer values ('Alex','HNFOSA', 'alex@mymail.com',7267875614);
INSERT into customer values ('Lucius','DUJD87', 'lkurten0@studiopress.com', 9598072503);
INSERT into customer values ('Grigs','KIFH76', 'rgrigs1@statcounter.com', 1789448756);
INSERT into customer values ('Mennear','DUNS87', 'gmennear2@lulu.com', 9009039174);
INSERT into customer values ('Recke','OFKDU7', 'brecke3@fema.gov', 9036281877);
INSERT into customer values ('Merrill','OJDUJ8', 'gmerrill4@mac.com', 5416709934);
INSERT into customer values ('Lehrian','IHDY79', 'slehrian5@amazon.co.uk', 4473498204);
INSERT into customer values ('Alton','OJJYD6', 'jalton6@scribd.com', 6222544526);
INSERT into customer values ('Munford','IJD7UJ', 'amunford7@nature.com', 4153357078);
INSERT into customer values ('Dowson','HDUKS8', 'bdowson8@howstuffworks.com', 3516401471);


--MOVIES

INSERT into movie values('UGNSJ7','Fame','Lemerle','8/23/2021');
INSERT into movie values('GSDAI6','Copying Beethoven','Jozefowicz','7/19/2021');
INSERT into movie values('HD7JSK','Gashte ershad','Abrahmer','6/8/2021');
INSERT into movie values('SADHGI','Do You Wanna Know a Secret?','Klampt','9/16/2021');
INSERT into movie values('SAH7YK','Flicker','Beggi','7/24/2021');
INSERT into movie values('SUDG7J','How to Meet Girls from a Distance','Gentner','10/14/2021');
INSERT into movie values('H7S9KJ','Horrible Dr. Hichcock, The','OBrogane','12/19/2020');
INSERT into movie values('HSA8H2','Operation Mad Ball','Bellelli','11/17/2020');
INSERT into movie values('HSAUH7','Nô','Gaukroger','2/26/2021');
INSERT into movie values('HSA8H5','Silentium','Hadlington','8/8/2021');

--actors
Insert into actors values( 'McClymont',55,'F', 'HSA8H5');
Insert into actors values('Kitney',99,'F', 'HSAUH7');
Insert into actors values('Bradford',60,'F', 'HSAUH7');
Insert into actors values('Richardson',100,'M','H7S9KJ');
Insert into actors values('Handslip',69,'M','SAH7YK');
Insert into actors values('Dizlie',60,'F','SAH7YK');
Insert into actors values('Renfrew',41,'M','SADHGI');
Insert into actors values('Frankton',33,'M', 'SADHGI');
Insert into actors values('Pavlov',21,'F','UGNSJ7');
Insert into actors values('Beetham',89,'F', 'UGNSJ7');

--offers
INSERT into offer values('HDSAIJ' , 20);
INSERT into offer values('9HSDAU' , 10);
INSERT into offer values('AD8JGA' , 24);
INSERT into offer values('AS98HS' , 50);
INSERT into offer values('AS7TGH' , 40);

--shows
INSERT into shows values('05:30', '08:00', 'IHSH76', 1, 3, '02/12/2020', 'SAH7YK', '8UHD7A');
INSERT into shows values('11:30', '13:00', 'GJ8H6G', 3, 1, '31/09/2021', 'UGNSJ7', 'A7VGBD');
INSERT into shows values('06:30', '08:45', 'OHJKU8', 5, 2, '12/10/2020', 'SUDG7J', 'A7VGBD');
INSERT into shows values('18:30', '22:15', 'IAJD8H', 2, 3, '05/06/2021', 'H7S9KJ', 'AHSA8A');
INSERT into shows values('13:45', '16:40', 'JS9U7H', 1, 6, '15/01/2020', 'SADHGI', '8UHD7A');
INSERT into shows values('09:15', '11:00', 'JSAIDH', 1, 4, '18/03/2020', 'HSA8H5', 'A7VGBD');
INSERT into shows values('10:50', '13:00', 'KSIAUJ', 2, 3, '06/05/2020', 'SUDG7J', '8UHD7A');
INSERT into shows values('23:30', '02:00', '9IJSAK', 5, 2, '18/12/2020', 'HSA8H2', 'AHSA8A');
INSERT into shows values('07:05', '09:00', 'A0SJ8S', 3, 1, '22/05/2020', 'HSA8H2', 'AHSA8A');
INSERT into shows values('15:20', '18:00', 'ASJ8JA', 4, 4, '01/11/2020', 'SAH7YK', 'A7VGBD');

--tickets
INSERT into ticket VALUES('YHSA8H', 12, 250, 'AD8JGA', 190, 'IHSH76', 'HNFOSA');
INSERT into ticket VALUES('HDJSAY', 63, 200, 'HDSAIJ', 160, 'GJ8H6G', 'KIFH76');
INSERT into ticket VALUES('YAASUQ', 57, 350, '9HSDAU', 315, 'OHJKU8', 'IJD7UJ');
INSERT into ticket VALUES('AISH61', 52, 400, 'AS98HS', 200, 'IAJD8H', 'IJD7UJ');
INSERT into ticket VALUES('ASIDH1', 26, 150, 'AD8JGA', 190, 'JS9U7H', 'HNFOSA');
INSERT into ticket VALUES('SID87H', 85, 200, 'HDSAIJ', 160, 'JSAIDH', 'IHDY79');
INSERT into ticket VALUES('Y8UED7', 50, 250, '9HSDAU', 225, 'IHSH76', 'HDUKS8');
INSERT into ticket VALUES('SADJ61', 42, 200, 'HDSAIJ', 160, 'KSIAUJ', 'OFKDU7');
INSERT into ticket VALUES('ASIU7H', 26, 285, 'AD8JGA', 190, '9IJSAK', 'IJD7UJ');
INSERT into ticket VALUES('AS8753', 54, 132, 'AS98HS', 76, 'ASJ8JA', 'DUNS87');

--sale
INSERT INTO sale values('JBAGD3', 'AS8753');
INSERT INTO sale values('A7VGBD', 'ASIDH1');
INSERT INTO sale values('AJNF5Y', 'SADJ61');
INSERT INTO sale values('ABJD82', 'YHSA8H');
INSERT INTO sale values('6HDIA', 'AISH61');
INSERT INTO sale values('JBAGD3', 'ASIU7H');
INSERT INTO sale values('8HNFGB', 'Y8UED7');
INSERT INTO sale values('6HDIA', 'YAASUQ');
INSERT INTO sale values('A7VGBD', 'HDJSAY');

--bookings
INSERT into booking values('02/03/2021','HDUKS8', 'AS8753');
INSERT into booking values('21/07/2020','HNFOSA', 'ASIDH1');
INSERT into booking values('27/10/2020','DUJD87', 'SADJ61');
INSERT into booking values('23/01/2021','KIFH76', 'YHSA8H');
INSERT into booking values('19/10/2021','OFKDU7', 'AISH61');
INSERT into booking values('08/05/2020','OJDUJ8', 'ASIU7H');
INSERT into booking values('15/03/2021','IHDY79', 'Y8UED7');
INSERT into booking values('09/08/2020','OJJYD6', 'YAASUQ');
INSERT into booking values('03/04/2021','IJD7UJ', 'HDJSAY');
INSERT into booking values('20/02/2021','DUNS87', 'SID87H');