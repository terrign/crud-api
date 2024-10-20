## Simple CRUD api

#### User type:

<pre>
type TUser = {
  id: UUID;
  username: string;
  age: number;
  hobbies: string[];
};
</pre>

#### Endpoints:

- api/users
  - GET
  - POST
- api/users/[userid]
  - GET
  - DELETE
  - PUT

#### Installation

###### 1. [Install Node.js >=22.0.0](https://nodejs.org/en/download/package-manager)

###### 2. Clone the repo

```sh
git clone -b develop https://github.com/terrign/crud-api.git
```

###### 3. Install dependencies

```sh
cd crud-api
```

```sh
pnpm install
```

###### 4. Run server

```sh
pnpm start:prod
```

Server is now listening at http://localhost:4000

###### See [postman collection](./public/Simple_CRUD_API.postman_collection.json) for example requests.
