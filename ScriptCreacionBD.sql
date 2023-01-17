#drop database cruzroja
create database cruzroja;
use cruzroja;

CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT,
        email VARCHAR (100),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(200) NOT NULL,
        phone_number varchar(20) NOT NULL, 
        avatar VARCHAR(550),
        birth_date date,
        location varchar(600),
        postal_code int(5),
        strikes int(1),
        interests text,
        health_issues text,
        car boolean,
        
        PRIMARY KEY(id)
    );
    
    CREATE TABLE IF NOT EXISTS volunteers(
        id INT AUTO_INCREMENT,
        email VARCHAR (50) UNIQUE NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(200) NOT NULL,
        phone_number varchar(20) NOT NULL,
        birth_date date,
        pass varchar (200) not null,
        availability VARCHAR(150),
        location varchar(600),
        postal_code int(5),
        studies varchar (100),
        rol  varchar (20),
        car boolean,
        volunteer_since date,
        
        PRIMARY KEY(id)
    );
    
    CREATE TABLE IF NOT EXISTS events_(
        id INT AUTO_INCREMENT,
        name_ VARCHAR (50) NOT NULL,
		location varchar(600),
        postal_code int(5),
        date_ date,
        theme varchar (100),
        
        PRIMARY KEY(id)
        );
        
    CREATE TABLE IF NOT EXISTS tickets(
        id INT AUTO_INCREMENT,
        title VARCHAR (50) NOT NULL,
		description_ text,
        date_ date,
        status_ varchar (30),
        fk_id_volunteer INT,
        
        PRIMARY KEY(id),
        foreign key (fk_id_volunteer) references volunteers(id) on delete set null
        );
        
            CREATE TABLE IF NOT EXISTS users_volunteers(
        id INT AUTO_INCREMENT,
        fk_id_volunteer INT,
        fk_id_user INT,
        
        PRIMARY KEY(id),
        foreign key (fk_id_volunteer) references volunteers(id) on delete set null,
        foreign key (fk_id_user) references users(id) on delete set null
        );
        
                    CREATE TABLE IF NOT EXISTS users_events(
        id INT AUTO_INCREMENT,
        fk_id_user INT,
        fk_id_event INT,
        
        PRIMARY KEY(id),
        foreign key (fk_id_user) references users(id) on delete set null,
        foreign key (fk_id_event) references events_(id) on delete set null
        );
        
                            CREATE TABLE IF NOT EXISTS volunteer_events(
        id INT AUTO_INCREMENT,
        fk_id_volunteer INT,
        fk_id_event INT,
        
        PRIMARY KEY(id),
        foreign key (fk_id_volunteer) references volunteers(id) on delete set null,
        foreign key (fk_id_event) references events_(id) on delete set null
        );
        
