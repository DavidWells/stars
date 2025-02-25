---
repo: andrei-demidov/django-sqlite-efs
url: 'https://github.com/andrei-demidov/django-sqlite-efs'
homepage: ''
starredAt: '2025-01-08T23:55:53Z'
createdAt: '2024-09-09T01:15:43Z'
updatedAt: '2025-01-31T11:30:40Z'
language: Python
license: MIT
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:18.731Z'
description: Django database backend for SQLite on Amazon EFS
tags:
  - aws-efs
  - aws-lambda
  - aws-lambda-python
  - django
  - django-database
  - django-sqlite
  - django-sqlite3
  - dynamodb
  - efs
  - elasticfilesystem
  - lambda
  - serverless
  - sqlite
  - sqlite3
---

# Django SQLite EFS Backend

**django_sqlite_efs** is a custom database backend for Django, designed to work with **SQLite** on **AWS Lambda** using **Amazon EFS** (Elastic File System) and **Amazon DynamoDB**. This backend provides a solution to protect SQLite databases from corruption caused by concurrent writes in network-attached storage environments that lack proper file locking mechanisms for SQLite.

## Features

- Implements a distributed locking mechanism using **DynamoDB** to prevent concurrent write access to the SQLite database.
- Designed for environments like **AWS Lambda** where multiple instances may attempt to access the SQLite database simultaneously.
- Protects SQLite databases from corruption due to the limitations of EFS's advisory locking.
- Uses **Amazon DynamoDB** to coordinate database locks and ensure safe write operations.

## Requirements

- **Python**: 3.11 or higher
- **Django**: 5.1 or higher
- **SQLite**: No additional installation required (built-in with Python)
- **AWS Services**:
  - **AWS Lambda**: For running the code.
  - **Amazon EFS**: For storing the SQLite database.
  - **Amazon DynamoDB**: For distributed locking to prevent concurrent writes.

## Demo

A basic Django polls application:

- [Live Demo](https://efficient.solutions/link/qxamw/)
- [Admin Portal](https://efficient.solutions/link/ffypx/) (read-only)
  - **Username:** demo
  - **Password:** djangoserverless

## Installation

To install `django-sqlite-efs`, simply use pip:

```bash
pip install django-sqlite-efs
```

## DynamoDB Configuration

Create a DynamoDB table to support distributed locking. The table should have the following schema:

- **Primary Key**: `pk` (Type: String)
- **Optional**: Configure expiration for the `expires_at` field for automatic cleanup of expired locks.

### Example DynamoDB Table:

| Attribute Name | Type    |
|----------------|---------|
| pk             | String  |
| lock_id        | String  |
| expires_at     | Number  |

Configuring `expires_at` with a TTL (Time-to-Live) policy is recommended for automatic removal of expired locks.

## Configuration

In your Django project, update the `settings.py` file to use the custom **database backend** provided by `django-sqlite-efs`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django_sqlite_efs',
        'NAME': 'path_to_your_sqlite_db_file',
        "OPTIONS": {
            # `timeout` - number of seconds to wait for lock acquisition.
            # It must be at least several seconds less than the timeout of
            # your Lambda function. Default and minimum value is 3.
            "timeout": timeout
            # Setting `init_commands` is not recommended because it overrides
            # default commands, which may lead to unexpected behavior.
        }
    }
}
```

Additionally, configure the following settings in `settings.py` or as environment variables:

- **SQLITE_LOCK_MAX_ATTEMPTS**: Maximum number of retries for acquiring a lock before raising an error (default: 10).
- **SQLITE_LOCK_EXPIRATION**: Lock expiration time in seconds (should be at least equal to or greater than the Lambda function's timeout).
- **SQLITE_LOCK_DYNAMODB_TABLE**: The name of the DynamoDB table used for locking.

### AWS Configuration

Ensure that your AWS credentials are correctly configured via environment variables or IAM roles. The package uses `boto3` to interact with DynamoDB. The Lambda function must have `PutItem` and `DeleteItem` permissions on the DynamoDB table.

## How It Works

SQLite uses file-based locking to prevent concurrent writes, but this is unreliable on **Amazon EFS** because EFS employs advisory locks. Advisory locks do not prevent processes from writing to a locked file if they have adequate permissions.

The **django_sqlite_efs backend** mitigates this by using **Amazon DynamoDB** to manage database locks:

- For each write operation (e.g., `INSERT`, `UPDATE`, `DELETE`), the backend attempts to acquire a lock in DynamoDB. 
- All write operations lock the database for both reads and writes until the operation completes.
- If a lock cannot be acquired, the backend retries multiple times using exponential backoff.
- The lock is released when the write operation completes.
- Read-only queries (`SELECT`) do not acquire a lock, allowing for concurrent read access without blocking.

## Limitations

1. **Concurrent Writes**: This backend **does not** support concurrent write operations. During any write operation, the database is locked, blocking all reads and writes until the operation completes.
  
2. **High Latency**:
   - **Read Latency**: Even for read-only requests, the latency for a typical Lambda execution with a Django app interacting with the database is over 100-150 ms due to the overhead of interacting with EFS.
   - **Write Latency**: Write operations have a latency of 300 ms or more during a typical Lambda execution.

This solution is designed for environments where write operations are infrequent.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.
