import { Login } from "@/services/AuthServices";
export default function HandleLoginForm(form, setErrorMessage) {
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    if(!username || !password) {
        setErrorMessage("Please fill in all fields");
        return;
    }
    if(username.trim() === "" || password.trim() === "") {
        setErrorMessage("Username and password cannot be empty");
        return;
    }
    if(username.length < 5){
        setErrorMessage("Username must be at least 5 characters long");
        return;
    }
    if(password.length < 6){
        setErrorMessage("Password must be at least 6 characters long");
        return;
    }
    setErrorMessage(""); // Clear any previous error messages
    Login(username, password,setErrorMessage);
}