# IChat - Chat Application 
IChat is chat application build with the power of MERN Stack.

## [DEMO VIDEO LINK](https://drive.google.com/file/d/1_DpfMpiK8j3sWCmm017vNbdraIFrpqXf/view?usp=sharing)

## Installation Guide

### Requirements
- [Nodejs](https://nodejs.org/en/download)
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/)

Both should be installed and make sure mongodb is running.

```shell
git clone https://github.com/varuag20/chatapp
cd chatapp
```
Now copy env files from .env.example to .env
```shell
cd public
cp .env.example .env
cd ..
cd server
cp .env.example .env
cd ..
```

Now install the dependencies
```shell
cd server
npm install
cd ..
cd public
npm install
```
We are almost done, Now just start the development server.

For Frontend.
```shell
cd public
npm start
```
For Backend.

Open another terminal in folder, Also make sure mongodb is running in background.
```shell
cd server
npm start
```

Done! Now open localhost:3000 in your browser.
