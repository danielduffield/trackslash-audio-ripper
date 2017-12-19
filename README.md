# trackslash-audio-ripper
A web app for music fans who want to slice audio from a YouTube video into tracks for download.

### Heroku Hosted URL
https://trackslash.herokuapp.com/

### How to Use

![TrackSlash Url Demonstration](/server/public/images/trackslash-demo-1.gif?raw=true "Url Submission")
<p align="center">Submit a YouTube URL.</p><br><br>

![TrackSlash Tracklist Demonstration](/server/public/images/trackslash-demo-2.gif?raw=true "Tracklist Editing")
<p align="center">Load, paste or input your timecodes to create and edit your tracklist.</p><br><br>

![TrackSlash Download Demonstration](/server/public/images/trackslash-demo-3.gif?raw=true "File Download")
<p align="center">Download tracks individually or in a zip folder.</p><br><br>

### Installation

Clone the repository using the following git command:
```
git clone https://github.com/danielduffield/trackslash-audio-ripper/
```
Create a .env file in the root directory of the cloned repository to contain the PORT information.
```
PORT=3000
```
Install required dependencies using the following git command:
```
npm install
```
Use the "watch" command defined in the package.json file to create a bundle file and run the server on the specified port.
```
npm run watch
```
Load the page in a web browser at the provided port. (Ex: localhost:3000)

### Technologies Used

* Express v4.15.3
* Socket.io v2.0.3
