# Rent House Management System API

Welcome to the Rent House Management System API! This API facilitates various operations related to booking, inbox management, maintenance requests, payments, property management, reporting, reviews, and user management for tenants and landlords.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [Booking Endpoints](#booking-endpoints)
  - [Inbox Endpoints](#inboxe-ndpoints)
  - [Maintenance Endpoints](#maintenance-endpoints)
  - [Payment Endpoints](#payment-endpoints)
  - [Property Management Endpoints](#property-management-endpoints)
  - [ Reporting Endpoints](#reporting-endpoints)
  - [Review Endpoints](#review-endpoints)
  - [User Management Endpoints](#user-management-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

#### Clone the repository:

```bash
git clone https://github.com/your-repo/rent-house-management-system.git
cd rent-house-management-system
```

#### Install dependencies:

```bash
npm install
```

#### Set Up Environment Variables:

Create a `.env` file in the root directory and configure the necessary environment variables:

```bash

# database config
DB_HOST = your_database_host
DB_PORT=your_database_port
DB_USER = your_database_user
DB_PASSWORD = your_database_password
DB_NAME = your_database_name

#port
PORT = your_server_port

# envirment
NODE_ENV = your_server_mode

# token
JWT_SECRET = your_jwt_secret
JWT_EXPIREIN= your_jwt_expire_time
JWT_COOKIE_EXPIREIN = your_cookie_expire_time

# email sender(nodemaialer)
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=your_mailtrap_port
EMAIL_USER=your_mailtrap_user
EMAIL_PASSWORD=your_mailtrap_password

```

#### Run the Application

```bash
npm start
```

## API Endpoints

### Booking Endpoints

<style>
    .header{
        background-color: #f2f2fe;
    }
    tr:nth-child(even) {
        background:#eee;
    }
</style>
<table>
  <thead>
    <tr class="header">
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Protected</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>post</strong></td>
      <td>/api/booking/now</td>
      <td>Book a property immediately.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>post</strong></td>
      <td class="endpoint">/api/booking/paid</td>
      <td>Confirm a paid booking.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>patch</strong></td>
      <td>/api/booking/:bookingId/reject</td>
      <td>Reject a booking.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>patch</strong></td>
      <td>/api/booking/:bookingId/confirm</td>
      <td>Confirm a booking.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/booking/booked</td>
      <td>Get current user's booked schedule.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/booking/:landlordId/landlord</td>
      <td>Get bookings for a landlord's properties.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/booking/:tenantId/tenant</td>
      <td>Get bookings by tenant ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>delete</strong></td>
      <td>/api/booking/:bookingId/unBooking</td>
      <td>Unbook a property.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>patch</strong></td>
      <td>/api/booking/:bookingId/requestCancellation</td>
      <td>Request a booking cancellation.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/booking</td>
      <td>Get all bookings.</td>
      <td>No</td>
    </tr>
    <tr>
      <td><strong>post</strong></td>
      <td>/api/booking</td>
      <td>Create a new booking.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/booking/:id</td>
      <td>Get booking by ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>patch</strong></td>
      <td>/api/booking/:id</td>
      <td>Update booking by ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>delete</strong></td>
      <td>/api/booking/:id</td>
      <td>Delete booking by ID.</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>

### Inbox Endpoints

<table>
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Protected</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/inbox/:userId/notReading</td>
      <td>Get unread inbox messages for a user.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/inbox/:userId/:all/users</td>
      <td>Get all inbox messages for a user.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>post</strong></td>
      <td>/api/inbox</td>
      <td>Create a new inbox message.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>delete</strong></td>
      <td>/api/inbox</td>
      <td>Delete an inbox message.</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>

### Maintenance Endpoints

<table>
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Protected</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/maintenance/:landlordId/landlord</td>
      <td>Get maintenance requests for a landlord.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>patch</strong></td>
      <td>/api/maintenance/:id/markAsCompleted</td>
      <td>Mark a maintenance request as completed.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/maintenance</td>
      <td>Get all maintenance requests.</td>
      <td>No</td>
    </tr>
    <tr>
      <td><strong>post</strong></td>
      <td>/api/maintenance</td>
      <td>Create a new maintenance request.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/maintenance/:id</td>
      <td>Get maintenance request by ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>patch</strong></td>
      <td>/api/maintenance/:id</td>
      <td>Update maintenance request by ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>delete</strong></td>
      <td>/api/maintenance/:id</td>
      <td>Delete maintenance request by ID.</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>

### Payment Endpoints

<table>
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Protected</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/payment/:landlordId/landlord</td>
      <td>Get payments for a landlord.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/payment/:tenantId/tenant</td>
      <td>Get payments by tenant ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/payment</td>
      <td>Get all payments.</td>
      <td>No</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/payment/:id</td>
      <td>Get payment by ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>patch</strong></td>
      <td>/api/payment/:id</td>
      <td>Update payment by ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>delete</strong></td>
      <td>/api/payment/:id</td>
      <td>Delete payment by ID.</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>

### Property Management Endpoints

<table>
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Protected</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/properties/search</td>
      <td>Search for properties.</td>
      <td>No</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/properties/:landlordId/properties</td>
      <td>Get properties by landlord ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/properties</td>
      <td>Get all properties.</td>
      <td>No</td>
    </tr>
    <tr>
      <td><strong>post</strong></td>
      <td>/api/properties</td>
      <td>Create a new property.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/properties/:id</td>
      <td>Get property by ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>patch</strong></td>
      <td>/api/properties/:id</td>
      <td>Update property by ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>delete</strong></td>
      <td>/api/properties/:id</td>
      <td>Delete property by ID.</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>

### Reporting Endpoints

<table>
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Protected</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/report/:landlordId/landlord</td>
      <td>Get reports for a landlord.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/report/admin</td>
      <td>Get reports for admin.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/report/:reportType</td>
      <td>Get reports by type.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/report</td>
      <td>Get all transportation reports.</td>
      <td>No</td>
    </tr>
  </tbody>
</table>

### Review Endpoints

<table>
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Protected</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/review/:propertyId/property</td>
      <td>Get reviews for a property.</td>
      <td>No</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/review/:tenantId/tenant</td>
      <td>Get reviews by tenant ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/review/:tenantId/tenant/:propertyId/property</td>
      <td>Get reviews for a specific property by tenant.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/review</td>
      <td>Get all reviews.</td>
      <td>No</td>
    </tr>
    <tr>
      <td><strong>post</strong></td>
      <td>/api/review</td>
      <td>Create a new review.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/review/:id</td>
      <td>Get review by ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>patch</strong></td>
      <td>/api/review/:id</td>
      <td>Update review by ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>delete</strong></td>
      <td>/api/review/:id</td>
      <td>Delete review by ID.</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>

### User Management Endpoints

<table>
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Protected</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>post</strong></td>
      <td>/api/user/signup</td>
      <td>Sign up a new user.</td>
      <td>No</td>
    </tr>
    <tr>
      <td><strong>post</strong></td>
      <td>/api/user/login</td>
      <td>Log in a user.</td>
      <td>No</td>
    </tr>
    <tr>
      <td><strong>post</strong></td>
      <td>/api/user/logout</td>
      <td>Log out a user.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/user/tenants</td>
      <td>Get a list of tenants.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/user/landlord</td>
      <td>Get a list of landlords.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/user/getUserInfo</td>
      <td>Get information of the logged-in user.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>patch</strong></td>
      <td>/api/user/updateMe</td>
      <td>Update the logged-in user's information.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/user</td>
      <td>Get all users.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>post</strong></td>
      <td>/api/user</td>
      <td>Create a new user.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>get</strong></td>
      <td>/api/user/:id</td>
      <td>Get user by ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>patch</strong></td>
      <td>/api/user/:id</td>
      <td>Update user by ID.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><strong>delete</strong></td>
      <td>/api/user/:id</td>
      <td>Delete user by ID.</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>

## Authentication
To ensure the security of the API, authentication is required for certain routes. The API uses JWT (JSON Web Tokens) for authentication. Users must provide a valid token in the Authorization header for protected routes:

```js
Authorization: Bearer <token>
```

## Error Handling
The API uses standard HTTP status codes to indicate the success or failure of requests. Common status codes include:


- [ ] `200 OK: Request succeeded`.
- [ ] `201 Created: Resource created successfully.`
- [ ] `400 Bad Request: Invalid request.`
- [ ] `401 Unauthorized: Authentication failed.`
- [ ] `403 Forbidden: Insufficient permissions.`
- [ ] `404 Not Found: Resource not found.`
- [ ] `500 Internal Server Error: Unexpected server error.`


## Contributing
Contributions are welcome! If you would like to contribute to the Rent House Management System API, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature`)

## License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.
