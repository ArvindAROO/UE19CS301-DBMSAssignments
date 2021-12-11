cd Assignment_2
echo "Assignment 2"
psql -U postgres -f "Theatre_booking_system_ddl.sql"
psql -U postgres -f "Theatre_booking_system_insert_values.sql"

cd ../Assignment_3
echo "Assignment 3"
psql -U postgres -f "/mnt/d/College/Sem 5/UE19CS301 - Database Management System/UE19CS301-DBMSAssignments/Assignment_3/simpleQueries.sql"
psql -U postgres -f "/mnt/d/College/Sem 5/UE19CS301 - Database Management System/UE19CS301-DBMSAssignments/Assignment_3/complexQueries.sql"
psql -U postgres -f "/mnt/d/College/Sem 5/UE19CS301 - Database Management System/UE19CS301-DBMSAssignments/Assignment_3/views.sql"
psql -U postgres -f "/mnt/d/College/Sem 5/UE19CS301 - Database Management System/UE19CS301-DBMSAssignments/Assignment_3/users.sql"

