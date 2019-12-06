# Welcome to the MEAN Stack Blog

A simple, no-frills MEAN Stack blogging app, created with MongoDB, Express.js, Angular 8 and Node.js.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

What things you need to install the software and how to install them

```
Node v10 or later
Terminal/Bash
```

### Installing

A step by step series of examples that tell you how to get a development env running

Install Angular CLI

```
npm install -g @angular/cli
```

Clone this GitHub repo

```
git clone https://github.com/milahose/mean-blog.git
```

Change directories into the project
```
cd mean-blog
```

Install server-side dependencies
```
npm install
```

Install client-side dependencies
```
cd client && npm install
```

Move back into the root directory
```
cd ..
```

Create an environment file
```
touch .env
```

Add your database and secret to the `.env` file
```
MONGO_URI=your-database-uri
SECRET=supersecret
```

Start up your local environment server
```
npm run start:dev
```

Visit 
```
http://localhost:4200/
```

That's it! Have fun, and thank you for reading.