# test-frameworks-js
The application contains 3 examples of using jest test framework
- [jest-simple](jest-simple)
- [jest-mongoose](jest-mongoose)
- [jest-mongoose-testcontainers](jest-mongoose-testcontainers)
<br/>
<br/>
### jest-simple
Just simple example to get acquainted with the most common [jest matchers](https://jestjs.io/docs/expect)

### jest-mongoose
Contains CRUD examples for testing repository implemented using mongoose on jest test framework.
In order for the tests to work correctly, you need to run the mongo database on port 27017.

### jest-mongoose-testcontainers
Contains CRUD examples for testing repository implemented using mongoose on jest test framework.
Testcontainers framework will automatically start docker container with a mongo instance and connect to necessary port.
So you don't need being worried about starting database.

## Prerequisites
- nodejs 18.15.0
- npm 9.5.0

## Run
- to install all necessary dependencies run `npm install`
- to run tests run `npm test`