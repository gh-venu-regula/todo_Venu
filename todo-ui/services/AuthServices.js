'use server';
export async function Login(prevState, formData) {
    const login_url = process.env.BACKEND_URL + "/auth/login";
    //const login_url = "http://localhost:5000/auth/login";
    const payload = {
        Username: formData.get("username").trim(),
        Password: formData.get("password").trim()
    };

    console.log("Sending payload:", payload);

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
            console.log("Login successful:", data);
            return { result: true, token: data.token,message: "success" };
        })
        .catch((error) => {
            console.error("Login error:", error);
            return { result: false, token: null,message: "fail" };
        });
}
export async function Signup(prevState, formData) {
    const signup_url = process.env.BACKEND_URL + "/auth/register";
    const payload = {
        Username: formData.get("username").trim(),
        Password: formData.get("password").trim()
    };

    console.log("Sending payload:", payload);

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
            console.log("Signup successful:", data);
            return { result: true, message: "success" };
        })
        .catch((error) => {
            console.error("Signup error:", error);
            return { result: false, message: "fail" };
        });
}
export async function VerifyUser(token) {
    const verify_url = process.env.BACKEND_URL + "/auth/verify";
    if (!token) {
        return { isvalid: false, message: "No token provided" };
    }
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
            console.log("Token verification successful:", data);
            return { isvalid: true, message: "success" };
        })
        .catch((error) => {
            console.error("Token verification error:", error);
            return { isvalid: false, message: "Token verification failed." };
        });
}