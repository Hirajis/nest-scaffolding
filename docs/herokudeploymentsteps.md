# `Nest js application deployment steps using Heroku`

## Login to Heroku from CLI

* 'heroku login' Use this command to login heroku using CLI.

## Create Heroku App

 * 'heroku create my-app' use this command to create an app on heroku.

 ## Push Your Code 

 * Use the following command to push your code into heroku app.

  1) git add .
  2) git commit -m "doing it live"
  3) git push heroku HEAD:master 

## Check heroku logs

* 'heroku logs --tail' Used this command for checking heroku logs after build successfully.

## Select specific file from heroku
* 'heroku git:remote -a nest-test01' used this command for selecting our project directory in heroku.
