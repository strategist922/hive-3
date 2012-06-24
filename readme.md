# hive

hive is a simple [node.js](http://nodejs.org) server for displaying logs and
statistics from remote processes.

![](https://github.com/martinrue/hive/raw/master/public/img/readme/hive.png)

## Deploying Locally

To install and run hive locally you can clone the repository and install
dependencies using npm.

    % git clone https://github.com/martinrue/hive
    % cd hive
    % npm install

To run hive you need to set the `PORT` environment variable or it will default
to port 5000.

    % export PORT=8080
    % node hive.js

## Deploying to Heroku

To install and run hive on Heroku you can download a tarball of the master
branch at https://github.com/martinrue/hive/tarball/master and then change to
the directory it was downloaded to in the terminal.

    % cd ~/Downloads
    % tar zxvf martinrue-hive-*.tar.gz
    % cd martinrue-hive-*

You are going to want to initialize this as a git repository and commit all
the files to it.

    % git init
    % git add .
    % git commit -m 'Initial commit'

Next you are going to create a new Heroku application and push the git
repository up to Heroku.

    % heroku create
    % git push heroku master

## API

Hive provides a simple HTTP interface that allows logs and statistics to be
created from a remote process. Hive logs multiple processes at once, so all
requests require a `name` parameter to identify the process that is creating
the log or statistic.

    POST /log
    Creates a textual log message

      HTTP Parameters
      ---------------
      name    - the name of the process that the log is associated with
      message - the textual log message to lodge

    POST /set
    Creates a statistic and sets it to the given value

      HTTP Parameters
      ---------------
      name  – the name of the process that the log is associated with
      key   – the name of the statistic
      value – the initial value of the statistic

    POST /inc
    Increments the value of the named statistic by 1 or as specified by the 'by' parameter

      HTTP Parameters
      ---------------
      name – the name of the process that the log is associated with
      key  – the name of the statistic
      by   – an optional amount by which to increment the statistic

    POST /dec
    Decrements the value of the named statistic by 1 or as specified by the 'by' parameter

      HTTP Parameters
      ---------------
      name – the name of the process that the log is associated with
      key  – the name of the statistic
      by   – an optional amount by which to decrement the statistic

## JSON Snapshot

The entire system state is held in memory and available as a raw JSON data
structure by making a GET request to `/snapshot`.

## Client

The [hive-client](https://github.com/martinrue/hive-client) module provides a
simple RPC-style wrapper around the hive API.
