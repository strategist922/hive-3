# hive

hive is a simple [node.js](http://nodejs.org) server for displaying logs and statistics from remote processes.

## Install

```
npm install https://github.com/martinrue/hive/tarball/master
```

## Running

Use node to execute hive.js. Optionally pass a port number if you wish to change it from the default 5000.

```
node hive.js [port]
```

## API

Hive provides a simple HTTP interface that allows logs and statistics to be created from a remote process. Hive logs multiple processes at once, so all requests require a `name` parameter to identify the process that is creating the log or statistic.

```
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
```

## Client

The [hive-client](https://github.com/martinrue/hive-client) module provides a simple RPC-style wrapper around the hive API.