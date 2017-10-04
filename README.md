# Burger

This is an app which allows the user to add new types of burgers to eat and then allows the user to devour those burgers.  This full-stack app uses mysql and handlebars. It takes in burger types from the user, then displays them on the left side of the screen with a "devour" button next to each. Clicking the "devour" button next to a burger moves the burger to the right side of the screen where all devoured burgers are listed. 

Express is used to handle routing. Handlebars are used for rendering the UI pages, and mysql is used as the persistent data store. The app runs on port 3500 locally. 

Inside the root folder, directories are organized as follow:
  ```
  Burger
    - node_modules
    - public
      - assets
        - css
          . style.css
        - img
          . burger.png
        - js
          . burgers.js  
    - views
      - layouts
        . main.handlebars
      . index.handlebars
    . package.json
    . package-lock.json
    . schema.sql
    . seeds.sql
    . server.js
  ```

### Details

1. `server.js` includes three routes:

   * A GET route to `/` which gets all the burgers in the mysql database and renders them on the index.handlebars page.
   * A POST route to `/api/burgers` which adds a new burger to the database based on the user's input.
   * A PUT route to `/api/burgers/:id` which devours (updates) the burger with the specific id passed in the URL.

2. The application's data is saved in the `burgers_db` database inside the `burgers` table. Each table row has the following columns:
     * **id**: an auto incrementing int that serves as the primary key.
     * **burger_name**: a string.
     * **devoured**: a boolean.
     * **date**: a TIMESTAMP.