create schema nikeShoes collate utf8mb4_bin;

use nikeShoes;

-- auto-generated definition
create table shoes
(
    id           char(36)     not null primary key,
    title        varchar(100) not null,
    model        varchar(100) not null,
    type         enum ('Jordan', 'Running', 'Basketball', 'Football', 'Training & Gym', 'Athletics', 'Walking') not null,
    sku          varchar(100) not null,
    published_at datetime     not null,
    stock        int            default 0 null,
    price        decimal(15, 2) default 0.0 null,
    description  text           default null
);

-- auto-generated definition
create table orders
(
    id         bigint                             not null
        primary key,
    shoe_id    char(36)                           not null,
    user_id    bigint                             not null,
    quality    tinyint                            not null,
    ordered_at datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
);

create index orders_shoe_id_idx
    on orders (shoe_id);

-- auto-generated definition
create table ratings
(
    shoe_id  char(36)                           not null,
    user_id  bigint                             not null,
    score    tinyint                            not null,
    rated_at datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    primary key (shoe_id, user_id),
    constraint uniq_shoe_user_idx
        unique (shoe_id, user_id)
);

-- auto-generated definition
create table users
(
    id       bigint       not null
        primary key,
    balance  decimal(15, 2) default 0.0 null,
    nickname varchar(100) not null,
    constraint nickname
        unique (nickname)
);
