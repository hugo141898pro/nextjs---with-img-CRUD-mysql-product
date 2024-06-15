create database product(
    id int unsigned auto_increment primary key,
    name varchar(200) not null,
    description varchar(200),
    price decimal(10,2),
    createdAt timestamp default current_timestamp
)