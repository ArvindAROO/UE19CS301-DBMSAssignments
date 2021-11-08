cd Assignment_2
echo "Assignment 2"
psql -U postgres -f "Theatre_booking_system_ddl.sql"
psql -U postgres -f "Theatre_booking_system_insert_values.sql"

cd ../Assignment_3
echo "Assignment 3"
psql -U postgres -f "simpleQueries.sql"
psql -U postgres -f "complexQueries.sql"
psql -U postgres -f "views.sql"
