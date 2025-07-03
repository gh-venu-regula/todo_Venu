'use server';
// Service function for user login
export async function Login(prevState, formData) {
    const login_url = process.env.BACKEND_URL + "/auth/login"; // Backend URL for login endpoint
    if (!formData.get("username") || !formData.get("password")) {
        return { result: false, token: null, status:"fail",message: "Username and password are required." }; // Return failure if username or password is missing
    }
    // Prepare payload with username and password
    const payload = {
        Username: formData.get("username").trim(),
        Password: formData.get("password").trim()
    };
    if(payload.Username.length < 5 || payload.Password.length < 6) {
        return { result: false, token: null,status:"fail", message: "Username must be at least 5 characters long and password must be at least 6 characters long." }; // Return failure if username or password is too short
    }
    console.log("Sending payload:", payload); // Log payload for debugging

    // Send POST request to login endpoint
    return await fetch(login_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Login successful:", data); // Log success response
            return { result: true, token: data.token, status:"success", message: "Login successful" }; // Return token and success message
        })
        .catch((error) => {
            console.error("Login error:", error); // Log error response
            return { result: false, token: null, status:"fail", message: "Login failed, Please check your credentials." }; // Return failure message
        });
}

// Service function for user signup
export async function Signup(prevState, formData) {
    const signup_url = process.env.BACKEND_URL + "/auth/register"; // Backend URL for signup endpoint
    if (!formData.get("username") || !formData.get("password")) {
        return { result: false, status:"fail", message: "Username and password are required." }; // Return failure if username or password is missing
    }
    // Prepare payload with username and password
    const payload = {
        Username: formData.get("username").trim(),
        Password: formData.get("password").trim()
    };
    if(payload.Username.length < 5 || payload.Password.length < 6) {
        return { result: false, status:"fail", message: "Username must be at least  5 characters long and password must be at least 6 characters long." }; // Return failure if username or password is too short
    }
    console.log("Sending payload:", payload); // Log payload for debugging

    // Send POST request to signup endpoint
    return await fetch(signup_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Signup successful:", data); // Log success response
            return { result: true, status: "success" ,message: "Signup successful" }; // Return success message
        })
        .catch((error) => {
            console.error("Signup error:", error); // Log error response
            return { result: false,status:"fail", message: "Signup failed, user already exists." }; // Return failure message
        });
}

// Service function for verifying user token
export async function VerifyUser(token) {
    const verify_url = process.env.BACKEND_URL + "/auth/verify"; // Backend URL for token verification endpoint

    if (!token) {
        return { isvalid: false, message: "No token provided" }; // Return failure if no token is provided
    }

    // Send GET request to verify endpoint with Authorization header
    await fetch(verify_url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Token verification successful:", data); // Log success response
            return { isvalid: true, message: "success" }; // Return success message
        })
        .catch((error) => {
            console.error("Token verification error:", error); // Log error response
            return { isvalid: false, message: "Token verification failed." }; // Return failure message
        });
}