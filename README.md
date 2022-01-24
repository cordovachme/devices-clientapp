# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements
Before start the applications make sure the nvm version, it will be 16.13.1 

Run the following scripts: 
#### `nvm install 16.13.1`
#### `nvm use 16.13.1`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Resources
###Server Application 
A backend application will be provided. You can perform some requests to it in order to do  all needed operations with devices. You do not need to make any changes on serverapp. This app does not have data persistency implemented. So, any change in the data (creation,  update or delete) will be lost if you kill the server. A new start will have the data in the initial  state. 
These are examples for the requests available: 
### GET devices 
GET http://localhost:3000/devices 
### POST device 
POST http://localhost:3000/devices 
Content-Type: application/json 
```
{ 
 "system_name": "my-mac", 
 "type": "MAC", 
 "hdd_capacity": "64" 
} 
```
### GET device 
GET http://localhost:3000/devices/e7ocoQ2n3 
### PUT device 
PUT http://localhost:3000/devices/e7ocoQ2n3 
Content-Type: application/json 
```{ 
 "system_name": "my-win-server", 
 "type": "WINDOWS_SERVER", 
 "hdd_capacity": "500" 
}
```
### DELETE device 
DELETE http://localhost:3000/devices/e8okoP2l5

Please download or clone this repository in order to use the server app.  https://github.com/NinjaMSP/devicesTask_serverApp


###Sort table: 
https://www.smashingmagazine.com/2020/03/sortable-tables-react/