Task 1. Crypto File Storage
Design and implement a simple RESTful web service that acts as a crypto file storage.
The service should provide the following endpoints:

POST /files - “encrypt and store a new file” endpoint. This endpoint expects an AES192 secret in an HTTP header and an uploaded file contents in the request body. On a valid request, it encrypts the file with AES192 algorithm, compresses it with GZip, generates a random filename (file_id) and stores the file in a local folder. Once done, it returns HTTP 201 status and a link to the newly created resource (file). The secret needs to be forgotten once the file is written to the disk, so it’s a client’s responsibility to remember the secret.


GET /files/{file_id} - “read uploaded files” endpoint. This endpoint serves saved encrypted files. When someone requests a valid file, it should unzip (but not decrypt) the file on the fly.


Other requirements:

Use only standard Node.js APIs.
Move main parameters of the application into a configuration file.
Implement a basic error handling mechanism.


Task 2. JS Eval as a Service

Design and implement a web service that evaluates the given JavaScript code. The code must be securely executed in a sandbox environment.

The service should provide the following endpoint:

POST /eval - “run JS code” endpoint. This endpoint expects JS code that will be executed in the request body. On a valid request, it executes the code and returns the result of the last expression in the response body.


Other requirements:

Use only standard Node.js APIs. The only exception may be vm2 library.
Consider security side of your application and try to avoid obvious vulnerabilities.
Restrict maximum execution time.
Your application needs to use all available CPU cores by default.
Move main parameters of the application into a configuration file.
Implement a basic error handling mechanism.
