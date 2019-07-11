# Dynamic Component

## Tech Stack

- Angular 6.1
- Bootstrap v4
- HTML
- SASS
- RxJS v6.2

## Getting started

- Once you download/clone this repo, navigate to the root of the project folder in the terminal
- If its the first time you have cloned the repo or if someone has added a new node_module in the repo, type ```npm install``` and wait for the installation process to be completed. If not, you'll see and error ```Cannot file module XYZ```
- Type ```npm run start``` to start the application on local development mode
- Once Webpack completes the compilation process, open your browser and navigate to ```http://localhost:4200/?admin=true```

## Modules

- **User:**  Till integrating with actual Login Mechanisms, we will be using route queryParams to differentiate User from admin. Open ```http://localhost:4200/?admin=false``` to open the app in User mode
- **Admin:** Open ```http://localhost:4200/?admin=true``` to open the app in Admin mode

## Folder structure

- App - This is the root of our angular application. This only consists of the modules required to bootsrap our application and the respective parent module of the journeys. In our case this is just the User and the Admin journeys.
- Assets - This will hold all the global styles, font files and images.
- Config - This will hold the hard-coded mock JSONs to create the UI. This can be used for local development and should be in all times same as the one we receive from the actual REST API calls
- Environment - This will contain the environment specific files
- Modules - This will host the journey specific modules/components **ONLY**. All reusable components should be segregated as separate modules for us to be able to extract them into different modules / repos (Promote reusable components)
- Components - Smallest chunks of codes that can be reused. They should be able to live by its own self in silos and pass their own unit testing with hardcoded JSON as inputs.

## HTTP Calls

- In your module, import shared module and list that module under imports
- In the service file for your module, import httpService from the http.service.ts file 
```import { HttpService } from '../../services/http.service';```
- Create a private instance of the type HttpService in the constructor. Let us assume it is named http
- To make a get call, do the following
```
this.http.get('https://demo1689001.mockable.io/user').subscribe(response => {
      console.log('Response: ', response);
    });
```
- Methods avvailable now - GET, POST, PUT

## Build Commands

- To start the server for local development: ```npm run start```
- To build production ready dist files: ```npm run build```
- To test lint: ```npm run lint```
- To unit test: ```npm run test```


### Note:

This project is still under construction. Update the readme as you make changes to the repo
