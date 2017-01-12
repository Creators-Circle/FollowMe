### Project Name
FollowMe -- Give your teacher the thumb!


### Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
    a. [Installing Dependencies](#installing-dependencies)
    b. [Tasks](#tasks)
4. [Team](#team)
5. [Contributing & Other Documentation](#contributing)

### Usage

You 

### Requirements

FollowMe uses to following technologies:

Node
Express
React/Redux
Knex/PostgresSQL


### Development Requirements
Heroku CLI required to connect to heroku db from local.
https://devcenter.heroku.com/articles/heroku-cli

Command to connect to db via CLI once setup:
heroku pg:psql DATABASE_URL --app present-me-beta

	## Installing Dependencies

	From within the root directory:
	npm install

	## Run the Seed File
	NOTE: THIS OPERATION WIPES THE DATABASE. USE WITH CAUTION. THIS MEANS YOU!!!

	FollowMe comes with dummy data located in the /seeds directory
	To load this data into the database, type:
	knex seed:run

	This command will wipe the existing database and reload it with dummy data. Note that if you add mutliple seed files, Knex will execute them in alphabetical order.

### Setup and Running Server
To start the server
npm run db_setup (Only need to do this the first time in a given terminal session.)
npm run build
npm start

### Roadmap

### Important Nomenclature
Lecture:  A specific instance in which a presenter is giving a presentation.
Presentation:  A set of Google slides.
lectureId:  ID assigned in database to lecture.
presentationId:  The ID provided by Google Slides API for slides.

### Team

  - __Product Owner__: Ross Topol
  - __Scrum Master__: Johnny McDuff
  - __Development Team Members__: Christian Aquino, Ari L. Frankel, Sheel Bedi

### Contributing and Other Documentation
Database schema at databaseschema.png, located in the root directory of this repo.

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
