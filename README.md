# TypeScript-Mongo API


## Installation

```bash
git clone https://github.com/har2008preet/fuzzy-chainsaw.git
cd <project>
npm install
```
mongo confiration is
```
connectionString = 'mongodb://localhost:27017';
```
if different, change your mongo configuration in `/src/db/mongo.db.ts`

## Scripts

1) Run ```npm run run-script-getUser``` to get Users from API and save it to database ``master`` and collection ``users``.
2) Run ```npm run run-script-mapPostComment``` to get Posts and Comments from API and link them with users and save them in mongodb with ``user_<userID>`` database and collection ``posts``.

## API

Run ``npm run start`` to start the server.

GET ``/users``: to get list of all users

GET ``/users/:id/posts`` : to get list of posts with comment of user with id ``:id``

GET ``/users/:id`` : to get details of user with id ``:id``

PATCH ``/users/:id`` : to update user with userId ``:id``. The updated json should be supplied in request body.

 