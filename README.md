
# Learning Management System 

A course listing website,here user can sign-in and create courses of their own and sell them.

## Key Features

- Authentication using clerk
- User can list their own courses.
- Postgres Database used
- Prisma ORM used
- Zod Validation used




## Installation

Clone the project on your machine

```bash
  git clone https://github.com/faisal004/learning-management-system.git
```
Open Project
```bash
cd learning-management-system
```
Install dependencies
```bash
yarn install
```

Set up .env file
Also you have to make account on [mux.com](https://www.mux.com) to get mux tokeniD and Secret
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/



DATABASE_URL="Your db url"
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=


MUX_TOKEN_ID=
MUX_TOKEN_SECRET=

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Setup Database
You can go to [neon.tech](https://neon.tech) to get a free postgres instance.Now run
```bash
npx prisma generate
npx prisma db push

```
Start app
```bash
yarn dev
```
