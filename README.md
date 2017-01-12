### Project Name
FollowMe -- Give your teacher the thumb!


### Table of Contents

1. [Usage](#usage)
2. [Requirements](#requirements)
3. [Development](#development)
    a. [Installing Dependencies](#installing-dependencies)
    b. [Run the Seed File](#seed-file)
    c. [Setup and Run Server](#setup)
4. [Important Nomenclature](#nomenclature)
5. [Team](#team)
6. [Contributing & Other Documentation](#contributing)

### Usage

FollowMe allows the user to assume one of two roles: Presenter or Audience.
	Presenter - Start Your Own Presentation:
		1. At the login page: you will have the choice to login with Github or Google, or proceed as a Guest without logging in. Login with Google or Github; you cannot present as Guest.
		2. In the upper left corner, click the 'New Presentation' button. 
		3. Select the presentation you wish to give from the 'Select a file' window.
		4. Near the top of the next page, you will see a six digit alphanumeric 'Join Code.' 
		5. Send this code to everyone you want to join the audience.
		6. Below the join code you will see a minature rendering of your slide deck. You can move through your slide deck normally from this window. 
		7. Below the slide deck are a series of options for the presenter to enable or disable:
			Projector: This button opens a new tab with your slide deck at full size. Ideal for simply presenting in front of a class.
			Question: This enables students to type and submit questions, which are displayed for the presenter and the whole class. Questions can be upvoted or downvoted, and are ranked by 
			popularity. Note that this component does not display the question's author, but that data exists in the database, and is given to the Presenter 
			Thumbs: Allows the presenter to submit a topic for vote. Users can vote up, down, or sideways. 
			Pulse: Displays a running tally of the number of times students have clicked the 'Feedback' button. This total falls off over time. 
			Feedback: Displays a 'Feedback' button for Users to click when having difficulty understanding the material. This button updates the running total under 'Pulse', described above.
			Permit Guests: Determines whether non-logged in users ('Guests') will be allowed to join the presentation. 
			Summary: Displays the Questions asked during the lesson, result of Thumbs polls, and number of times each student has clicked the feedback button.
			Stop Presentation: Ends the presentation, and displays the Summary page. 
	
	Audience - View a Presentation:
		1. Log in with Github, Google, or as a Guest. 
		2. Depending on the options enabled by the Presenter, you will have different ways to interact with the Presenter. 



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

	## Setup and Run Server
	To start the server
	npm run db_setup (Only need to do this the first time in a given terminal session.)
	npm run build
	npm start

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
