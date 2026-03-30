# API Reference - Rijschool De Admiral Admin Panel

## Base URL
```
http://localhost:5000
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

## Admin Authentication Endpoints

### 🔐 Public Endpoints (No Authentication Required)

#### 1. Register Admin
```http
POST /api/v1/admin/register
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Admin registered successfully. Please check your email for OTP verification.",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "admin@example.com",
    "isVerified": false
  }
}
```

#### 2. Login Admin
```http
POST /api/v1/admin/login
```

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Login OTP sent to your email. Please verify to continue.",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "admin@example.com",
    "isVerified": true
  }
}
```

#### 3. Verify OTP
```http
POST /api/v1/admin/verify-otp
```

**Request Body:**
```json
{
  "email": "admin@example.com",
  "otp": "123456",
  "type": "login" // or "register" or "forgot"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Login verified successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "admin@example.com",
    "isVerified": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 4. Resend OTP
```http
POST /api/v1/admin/resend-otp
```

**Request Body:**
```json
{
  "email": "admin@example.com",
  "type": "login" // or "register" or "forgot"
}
```

**Response:**
```json
{
  "status": true,
  "message": "OTP resent successfully"
}
```

#### 5. Forgot Password
```http
POST /api/v1/admin/forgot-password
```

**Request Body:**
```json
{
  "email": "admin@example.com"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Password reset OTP sent to your email"
}
```

#### 6. Reset Password
```http
POST /api/v1/admin/reset-password
```

**Request Body:**
```json
{
  "email": "admin@example.com",
  "otp": "123456",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Password reset successfully"
}
```

### 🔒 Protected Endpoints (Authentication Required)

#### 7. Get Admin Profile
```http
GET /api/v1/admin/profile
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "status": true,
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "admin@example.com",
    "isVerified": true,
    "imageUrl": null,
    "createdAt": "2024-01-20T10:30:00.000Z",
    "updatedAt": "2024-01-20T10:30:00.000Z"
  }
}
```

#### 8. Update Admin Profile
```http
PUT /api/v1/admin/profile
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Smith",
    "email": "admin@example.com",
    "isVerified": true,
    "imageUrl": null,
    "createdAt": "2024-01-20T10:30:00.000Z",
    "updatedAt": "2024-01-20T11:00:00.000Z"
  }
}
```

#### 9. Change Password
```http
POST /api/v1/admin/change-password
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Password changed successfully"
}
```

#### 10. Update Admin Image
```http
PUT /api/v1/admin/image
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

**Request Body (FormData):**
```
image: <file>
```

**Response:**
```json
{
  "status": true,
  "message": "Image updated successfully",
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "admin@example.com",
    "isVerified": true,
    "imageUrl": "uploads/admins/image-1234567890.jpg",
    "createdAt": "2024-01-20T10:30:00.000Z",
    "updatedAt": "2024-01-20T11:30:00.000Z"
  }
}
```

## Frontend Implementation

### Services Location
- **API Service**: `/src/services/api.js` - Axios configuration and interceptors
- **Auth Service**: `/src/services/authService.js` - All authentication API calls
- **Auth Context**: `/src/contexts/AuthContext.jsx` - Global authentication state management

### Components Using Authentication
- **Login**: `/src/components/Login.jsx` - Complete authentication flow
- **Protected Route**: `/src/components/ProtectedRoute.jsx` - Route protection wrapper
- **Admin Layout**: `/src/components/AdminLayout.jsx` - Main admin layout with user info
- **Admin Sidebar**: `/src/components/AdminSidebar.jsx` - Navigation with logout

### Authentication Flow
1. **Login**: User enters email/password → OTP sent to email
2. **OTP Verification**: User enters OTP → JWT token returned
3. **Token Storage**: Token stored in localStorage
4. **Auto-Auth**: Token automatically added to all protected requests
5. **Route Protection**: Protected routes check authentication status
6. **Logout**: Token removed and user redirected to login

### Error Handling
- 401 Unauthorized → Auto logout and redirect to login
- 400 Bad Request → Display error message to user
- 500 Server Error → Display generic error message
- Network Errors → Display connection error message

### OTP Types
- `register` - For account registration verification
- `login` - For login verification
- `forgot` - For password reset verification

### Security Features
- JWT tokens with expiration
- OTP verification for all sensitive operations
- Password comparison using bcrypt
- Rate limiting on OTP requests (1 minute cooldown)
- Automatic token cleanup on logout

## Environment Variables
Create `.env` file in frontend root:
```
VITE_API_URL=http://localhost:5000
```

## Testing the API
Use Postman or curl to test endpoints:

```bash
# Login
curl -X POST http://localhost:5000/api/v1/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Get Profile (with token)
curl -X GET http://localhost:5000/api/v1/admin/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Future API Endpoints (To Be Implemented)
- Packages CRUD operations
- Posts CRUD operations  
- Contact messages management
- File upload handling
- Analytics and statistics

---

**Note**: This reference document should be updated whenever API endpoints are modified or new ones are added.
