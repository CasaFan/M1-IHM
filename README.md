# Project AngularJS
Web application to control connected media devices (Upnp protocol)  

## Getting Started 
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
See deployment for notes on how to deploy the project on a live system.

### Prerequisites
* [Docker](https://www.docker.com)
* [Npm](https://www.npmjs.com)
* Gulp

### Installing
* Clone or download the project  
if git : 
```
yourPC@name:~[PathToProject]$ git clone https://github.com/CasaFan/M1-IHM.git
```  
* Install dependencies
```
yourPC@name:~[PathToProject]$ npm install
```  
* Compile the project
```
yourPC@name:~[PathToProject]$ gulp
```  
* Run the server in docker with the client code
```
yourPC@name:~[PathToProject]$ sudo docker run -ti --net=host --volume [PathToProject]/Media-Control-Application/Angular_1_5_x:/tacthab/client/ alexd2/m1m-serveur
```  
* Open a browser and go to localhost:8888  

## Some screenshots  
![Alt text](/screenshots/img1.png?raw=true "initiated screen with servers online")  
            ----- initiated screen with servers online -----  

![Alt text](/screenshots/img2.png?raw=true "device detected")  
            ----- device detected -----  
  
![Alt text](/screenshots/img3.png?raw=true "control of device")  
            ----- control of device -----  
  
![Alt text](/screenshots/img4.png?raw=true "media detail")  
            ----- media detail -----  

## Stack
### Front
* [AngularJS 1.5](https://angularjs.org/) - The JS framework used  
* [AngularMaterial](https://material.angularjs.org) - The UI fromework used  
### Back (by [AlexDmr](https://github.com/AlexDmr))
* [NodeJS](https://nodejs.org) - Used for backend developpement ()  
* [Docker](https://www.docker.com) - The container used for the Front development environment  

## To impove
* Responsibility (ex.mobile browser)  
