This is a basic API setup that includes the major http request verbs setup using node framework, express.js.
It can be tested and implemented by cloning the directory and running the command npm install via the terminal.
The API contains endpoints such as route.get, route.post, route.put and route.delete and their respective route handlers for executing users requests.

How to Run:
Install Dependencies:
    npm install express express-validator

Run the Application:
    node app.js

Test the Endpoints:
    Use a tool like Postman, curl, or your browser to interact with the endpoints.

Example Requests:

GET /items:

    curl http://localhost:3000/items

POST /items:

    curl -X POST http://localhost:3000/items \
    -H "Content-Type: application/json" \
    -d '{"name": "New Item", "description": "This is a new item"}'

PUT /items/1:

curl -X PUT http://localhost:3000/items/1 \
    -H "Content-Type: application/json" \
    -d '{"name": "Updated Item", "description": "This is the updated description"}'

DELETE /items/1:

    curl -X DELETE http://localhost:3000/items/1

