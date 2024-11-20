# DBMonster Setup

Do you want to set up a database for your project but can't decide which one to choose?  
**Why choose when you can have them all?**

This project sets up every mainstream database for you. With just a single command, you can have the following databases running:

- PostgreSQL
- MongoDB
- Redis
- SQLite
- MariaDB
- Cassandra
- CouchDB
- CockroachDB

## Getting Started

All you need to do is run the following command:

```bash
docker-compose up --build -d
```

Then, just wait for the databases to start up. Once they're up, you can connect to any of them and start using them in your project!

### Prerequisites

- Docker
- Docker Compose

### Ports

For the databases to work properly, make sure you have the following ports available on your machine:

- **MongoDB**: 27017
- **PostgreSQL**: 5432
- **Redis**: 6379
- **Cassandra**: 9042
- **MariaDB**: 3306
- **CockroachDB**: 26257
- **CouchDB**: 5984

These ports are mapped from the containers to your local machine. If any of these ports are already in use, you'll need to stop the service or change the ports in the `docker-compose.yml` file.

## Known Issues

- **Cassandra** sometimes throws an `ECONNREFUSED` error.  
  To resolve this, simply run the same command again without bringing the containers down:

  ```bash
  docker-compose up --build -d
  ```
