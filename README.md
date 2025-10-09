# whois
A simpler way to remember.

## 1. Goal
whois is a simple agenda like app, it let you register, login, crud contacts.
the main functionality of whois is his all-in-one query field, letting you search between all the elements of a contact on the spot.

## 2. Features
- JWT Auth
- Full CRUD of contacts
- Swagger doc
- Units Tests

## 3. Installation

The installation process is splitted in 2 distinct projects, back and front.

### Backend installation :
back can be installed and started with

```
cd back
npm install
npm run start
```
tests can be executed with the "test" script.

```
cd back
npm install
npm run test
```

### Frontend installation :
front can be installed and started with

```
cd front
npm install
npm run start
```

## 4. Deployed instances

One instance of whois is already deployed using Render.
I recommend selfhosting because render free tier is HORRIBLE
Checkout another one of my projects, [FreshPerf](https://freshperf.fr), for cheap hosting :)

front: https://whois-front.onrender.com/
back:  https://whois-mkgt.onrender.com/
swagger: https://whois-mkgt.onrender.com/api-docs

## 5. Tech Stack

- NodeJS with Express
- Swagger for doc
- MongoDB
- React
- Render for hosting
- JWT
- Bcrypt

## 6. Author

Made with coffee and with 💛 by Fyz (Thibeau B.)
MIT Licence
