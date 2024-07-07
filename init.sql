CREATE SCHEMA users;
CREATE TABLE users.users (
  id SERIAL PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  google_id VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  picture VARCHAR(255) NOT NULL
);
CREATE SCHEMA products;
CREATE TABLE products.products (
  id SERIAL PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  name VARCHAR(255) NOT NULL,
  description text NOT NULL,
  main_image VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  quantity INTEGER,
  author VARCHAR(255)
);
insert into products.products (name, description, main_image, category, price, quantity, author)
values ('How to build an ecommerce store', 'The best book ever', 'https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg', 'ebook', 19.99, 100, 'connor peshek');
insert into products.products (name, description, main_image, category, price, quantity, author)
values ('My resume', 'Actually the best book ever', 'https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg', 'ebook', 99.99, 100, 'connor peshek');
insert into products.products (name, description, main_image, category, price, quantity, author)
values ('Necronomicon', 'Its cool. I said the words. I did!', 'https://images-cdn.ubuy.co.id/65536d308301b1521c28f473-necronomicon-ex-mortis-illustrated.jpg', 'ebook', 6.66, 666, 'Ruby');
insert into products.products (name, description, main_image, category, price, quantity, author)
values ('book 4 - we have gone too far', 'This book should never have been written', 'https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg', 'ebook', 99.99, 100, 'connor peshek');
CREATE SCHEMA cart;
CREATE TABLE cart.cart (
  id SERIAL PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1 NOT NULL,
  status VARCHAR(255) DEFAULT 'active' NOT NULL
);
CREATE UNIQUE INDEX idx_user_product ON cart.cart (user_id, product_id) WHERE status = 'active';
insert into cart.cart (user_id, product_id, quantity, status) values (1, 1, 1, 'active');
insert into cart.cart (user_id, product_id, quantity, status) values (1, 2, 1, 'active');
insert into cart.cart (user_id, product_id, quantity, status) values (1, 3, 1, 'active');
CREATE SCHEMA checkout;
CREATE TABLE checkout.checkout (
  id SERIAL PRIMARY KEY NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  user_id INT NOT NULL,
  total_price MONEY NOT NULL,
  billing_status VARCHAR(255) NOT NULL,
  shipping_status VARCHAR(255) NOT NULL,
  tracking_number VARCHAR(255)
);
insert into checkout.checkout (user_id, total_price, billing_status, shipping_status, tracking_number) values (1, 120.00, 'paid', 'delivered', '1234567890');