## Simple CRUD api

### Endpoints:

- api/users
  - GET
  - POST
- api/users/[userid]
  - GET
  - DELETE
  - PUT

### User type:

<pre>
type TUser = {
  id: UUID;
  username: string;
  age: number;
  hobbies: string[];
};
</pre>

### Installation

#### 1. [Install Node.js >=22.0.0](https://nodejs.org/en/download/package-manager)

#### 2. Clone the repo

```sh
git clone -b develop https://github.com/terrign/crud-api.git
```

#### 3. Install dependencies

```sh
cd crud-api
```

```sh
pnpm install
```

#### 4. Run server

```sh
pnpm start:prod
```

Server url: http://localhost:4000

### Example requests

See [postman collection](./public/Simple_CRUD_API.postman_collection.json)

### Dev server

```sh
pnpm start:dev
```

Server url: http://localhost:5000

### Tests

#### 1. Run test server

```sh
pnpm start:test
```

Server url: http://localhost:3000

#### 2. Run tests

```sh
pnpm test
```
