#### 1. Setup your db

Your `DATABASE_URL` should look like `mysql://<User>:<Password>@<Host>:<Port>/<dbname>`

#### 2. Import table structures and data

Run `schema.sql` to create database and tables, and then run `data.sql` to insert data.


#### 3. How to Run server
> run dev server with next

```bash
npm run dev
```

> Build and run

```bash
npm run build
node server.js
```