# trackslash-audio-ripper
A web app for music fans who want to slice audio from a Youtube video into tracks for download.

![TrackSlash Demo](/demo/trackslash-demo.gif?raw=true "TrackSlash Demonstration")

### How to use

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
