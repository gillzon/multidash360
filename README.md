# multidash360
Multi dashboard based on ReactJs and Express server to get a holistic view of your SystemLink event. If you planning to host a system link Lan you can see current status of all you xboxes. Just add the API in the multi dash UI then you are good to go!
- - - -
## Requirements ##
* Xbox 360 running RGH hack or Jtag. 
* Aurora dashboard with http webui without authentication

## How to run it ##
Clone the repo and the run npm install in root folder. After that you need to run npm install in the client folder for react app(reactjs). Currently both backend and front end are inte the same project maybe split it to two projects in the future but right now it's pretty smal hobby project.
## Docker ##
Run with docker:
`sudo docker build -f Dockerfile -t multidash360:v0.1 .`

`sudo docker run -d -p 3600:3600 multidash360:v0.1`

## Todo ##
* Support for authentication
* Add player info related to xbox
* Add nickname to xbox(living room, kitchen etc)
* Take screenshot
* Possible to integrate leaderboards from games(possible dependency to new feature in  aurora)
