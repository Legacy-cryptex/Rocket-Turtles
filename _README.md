# Blob

> A tamagotchi style health tracking app

## Team

- **Product Owner**: Rikki
- **Scrum Master**: Steven
- **Development Team Members**: Yirey, Ethan

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
   1. [Installing Dependencies](#installing-dependencies)
   1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Sign up and start entering sleep and food data. Your Blob will appreciate it.

## Requirements

- Node: ^8.11.3
- axios: ^0.18.0,
- body-parser: ^1.18.3,
- chart.js: ^2.7.3,
- express: ^4.16.4,
- knex: ^0.15.2,
- moment: ^2.22.2,
- pg: ^7.5.0,
- react: ^16.5.2,
- react-chartjs-2: ^2.7.4,
- react-datetime: ^2.16.2,
- react-dom: ^16.5.2

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Manipulating Postgresql from Heroku

Resetting db

```sh
heroku pg:reset DATABASE
```

Migrating DB

```sh
heroku run knex migrate:latest
```

Seeding DB

```sh
heroku run knex seed:run
```

Checking logs

```sh
heroku logs --tail
```

Opening page

```sh
heroku open
```

### Deployment

```sh
git push heroku master
```

### Roadmap

View the project roadmap [here](https://github.com/Rocket-Turtles/Rocket-Turtles/issues)

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.

PRIORITY NUMBER ONE destroy the blob
new Name: Virtual Granny

1. auth--ab and mi

2. add friends (request) --chris
   a) track other users (not all, just ones you choose to 'follow')

3. profile improvements --flex
   a) cartoon-avatar for profile (expressions, trigger gifs)
   c) male or female

4. landing page --
   a) welcome, description, log in or sign up!
   b) track your sleep, food/calorie intake
   c) inspirational quote / testimonials
   d) disclaimer at bottom (for entertainment not real health)
   e) serious css work (hover)

5. list/remove food items --chris//flex
   check out breaking foods

-------optional start here---------

b) profile bling? for good habits (start with gold stars perhaps) (score)
d) friends tab / leaderboards --pending on scoring system implementation

5. calories additions:
   a) nutritional info, daily totals
   b) removing food items
   c) list of things theyve eaten, click to expand? click to remove?
   d) score mechanic

6. water consumption
   a) glasses towards total goal? percentage? graph?
   b) counts score

7) sun or moon depending on time of day access program -----short time
   a) whoever finishes first

## nightmare mode

3. improve sleep tracking- when you go to bed vs wake up (stay consistent)
   //twitter bot? reminders to go to bed
   doo dee do
