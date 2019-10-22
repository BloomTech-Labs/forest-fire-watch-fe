![React](https://img.shields.io/badge/react-v16.9-blue.svg)
![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/65d8b884-4807-40de-a05b-0cc08b7ddf48/deploy-status)](https://app.netlify.com/sites/fireflightapp/deploys)

# Forest Fire Watch

You can find the deployed project at [wildfire-watch-staging.com](http://wildfire-watch-staging.netlify.com).

## Contributors

<br>
<br>

## Project Overview

[Trello Board](https://trello.com/b/LHd7GbuL/labs15-forest-fire)

[Product Canvas](https://www.notion.so/Forest-Fire-Prediction-and-Rescue-Coordination-7eb1595c5f1643fca8e48a89c6086fdf)

[UX Design files](https://www.dropbox.com/sh/gknqzhazljiw16t/AAALcR4-2XljeEPDXM6Wjhu_a?dl=0)

## Specifications

This applicaation is designed to help people understand when they are in danger of being struck by a wild fire, and hopefully give them time to get out.

### Key Features

- User can see all wildfires within the United States, as well as see wildfires with a marker within a range they set.
- User can log in and add multiple addresses. They can also set a distance from that address where the app will provide data about wild fires.
- Application will alert the user when fire is within their set radius by SMS or push notification in the web browser.

## Tech Stack

- React
- Node.js
- Twilio
- MapBox

### Front end built using:

#### React 16.9

- Everyone in project is familiar with it.

#### Hooks

- Hooks cleans up code and reduces the need for class components.

#### Context API

- Comes with React.
- Works well with hooks.

#### Axios

- For handling API requests, makes AJAX requests a lot easier.

#### MapBox

- Free up to 25,000 users per month and 50,000 map loads per month.
- Has a React Library.

#### Node-Sass

- Create-React-App version makes it very simple to use Sass to manage site styles.

#### Front end deployed to `Netlify`

#### [Backend](https://github.com/labs15-forest-fire/backend) built using:

#### ExpressJS

- The popular back-end NodeJS server code makes making an API much easier.

#### KNEX

- For management of Database Structrure.

#### BCRYPT

- For hashing passwords, used to protect password information.

#### JWT

- For handling authorizations.

# APIs

## Mapbox

- This api gives the application the abilty to convert addresses to lat/long for our backend applications. Later, this will give us the ability to show more data to the users.

# Environment Variables

# Privacy Policy

Please read our privacy policy [_here => Privacy Policy_](https://app.termly.io/document/privacy-policy/865784e8-0f1a-42be-b3f9-4afbb2b7ad45)

# Content Licenses

All content created by [Jeffery Wicks]("https://www.linkedin.com/in/jeffwicks-interactiondesign/")

# Testing

# Installation Instructions

1.  Fork this repository.
2.  Clone this repository.
3.  Navigate into the 'fireflight' directory.
4.  Use npm install, yarn install, or pnpm install.
5.  Checkout your own branch and start hacking.

## Other Scripts

    * build - creates a build of the application
    * start - starts the production server after a build is created
    * test - runs tests in **tests** directory
    * eject - copy the configuration files and dependencies into the project so you have full control over them

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](https://github.com/labs15-forest-fire/backend) for details on the backend of our project.
