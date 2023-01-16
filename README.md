# CRUD_API
## How to start

1. Clone the repository
```
https://github.com/nikolakozaryan/CRUD_API.git
```
2. Move to app folder
```
cd CRUD_API
```
3. Change brunch to develop
```
git checkout develop
```
4. Install dependencies
```
npm install
```
## How to run the app
1. To start the app in development mode (run the app with nodemon)
```
npm run start:dev
```
2. To start the app in production mode (create bundle file with webpack and run it)
```
npm run start:prod
```
## API

Implemented endpoint:  
`api/users`

Methods:

**GET** `api/users` is used to get all users  
Server answers with status code 200 and all users records
  
**GET** `api/users/${userId}` is used to get a specific user
Server answers with status code **200** and record with `id === userId` if it exists  
Server answers with status code **400** and corresponding message if `userId` is invalid (not uuid)  
Server answers with status code **404** and corresponding message if record with `id === userId` doesn't exist  
   
**POST** `api/users` is used to create a record about new user and store it in database  
Server answers with status code **201** and newly created record  
Server answers with status code **400** and corresponding message if request body does not contain required fields  
   
**PUT** `api/users/{userId}` is used to update existing user  
Server answers with status code **200** and updated record  
Server answers with status code **400** and corresponding message if `userId` is invalid (not uuid)  
Server answers with status code **404** and corresponding message if record with `id === userId` doesn't exist  
   
**DELETE** `api/users/${userId}` is used to delete existing user from database  
Server answers with status code **204** if the record is found and deleted  
Server answers with status code **400** and corresponding message if `userId` is invalid (not uuid)  
Server answers with status code **404** and corresponding message if record with `id === userId` doesn't exist 
