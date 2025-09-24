import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login"); // Login or Sign Up
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  // Forgot / Reset password states
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { setShowRecruiterLogin } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // ============ LOGIN / SIGNUP HANDLER ============
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const res = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          alert("✅ Login successful!");
          setShowRecruiterLogin(false);
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        } else {
          alert("❌ " + data.message);
        }
      } else {
        // SIGN UP
        if (!isTextDataSubmited) {
          setIsTextDataSubmited(true);
          return;
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if (image) formData.append("image", image);

        const res = await fetch("http://localhost:5000/signup", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (res.ok) {
          alert("✅ Account created successfully!");
          setState("Login");
          setIsTextDataSubmited(false);
          setName(""); setEmail(""); setPassword(""); setImage(false);
          navigate("/dashboard");
        } else {
          alert("❌ " + data.message);
        }
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong!");
    }
  };

  // ============ FORGOT PASSWORD HANDLER ============
  const handleForgotPassword = async () => {
    try {
      const res = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      alert(data.message + "\nCheck backend console for reset token.");
      console.log("Reset Link:", data.resetLink);
      setShowForgot(false);
      // Extract token from console link (for testing paste manually)
      const tokenFromLink = data.resetLink.split("/").pop();
      setResetToken(tokenFromLink);
      setShowReset(true);
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong!");
    }
  };

  // ============ RESET PASSWORD HANDLER ============
  const handleResetPassword = async () => {
    try {
      const res = await fetch(`http://localhost:5000/reset-password/${resetToken}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Password reset successful! You can now login.");
        setShowReset(false);
        setState("Login");
        setForgotEmail(""); setNewPassword(""); setResetToken("");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong!");
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form onSubmit={onSubmitHandler} className="relative bg-white p-10 rounded-xl text-slate-500 w-96">
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {/* SIGNUP IMAGE UPLOAD */}
        {state === "Sign Up" && isTextDataSubmited ? (
          <div className="flex items-center gap-4 my-10">
            <label htmlFor="image">
              <img
                className="w-16 rounded-full"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload Logo"
              />
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
            <p>Upload Company <br />logo</p>
          </div>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />
                <input className="outline-none text-sm" onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Company Name" required />
              </div>
            )}
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input className="outline-none text-sm" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email Id" required />
            </div>
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input className="outline-none text-sm" onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
            </div>
          </>
        )}

        {/* FORGOT PASSWORD */}
        {state === "Login" && !showForgot && !showReset && (
          <p className="text-sm text-blue-600 mt-4 cursor-pointer" onClick={() => setShowForgot(true)}>
            Forgot password?
          </p>
        )}

        {/* FORGOT PASSWORD MODAL */}
        {showForgot && (
          <div className="mt-4 border p-4 rounded-md bg-gray-50">
            <p className="text-sm mb-2">Enter your email to reset password:</p>
            <input className="outline-none border px-2 py-1 w-full mb-2" type="email" placeholder="Email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
            <div className="flex justify-between">
              <button type="button" className="bg-blue-500 text-white px-3 py-1 rounded-md" onClick={handleForgotPassword}>
                Send Link
              </button>
              <button type="button" className="bg-gray-400 text-white px-3 py-1 rounded-md" onClick={() => setShowForgot(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* RESET PASSWORD MODAL */}
        {showReset && (
          <div className="mt-4 border p-4 rounded-md bg-gray-50">
            <p className="text-sm mb-2">Enter new password:</p>
            <input className="outline-none border px-2 py-1 w-full mb-2" type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <div className="flex justify-between">
              <button type="button" className="bg-green-500 text-white px-3 py-1 rounded-md" onClick={handleResetPassword}>
                Reset Password
              </button>
              <button type="button" className="bg-gray-400 text-white px-3 py-1 rounded-md" onClick={() => setShowReset(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 w-full text-white py-2 rounded-full mt-4 hover:scale-105 hover:shadow-lg transition-all duration-300 m-1">
          {state === "Login" ? "Login" : isTextDataSubmited ? "Create Account" : "Next"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={() => setState("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={() => setState("Login")}>Login</span>
          </p>
        )}

        <img onClick={() => setShowRecruiterLogin(false)} className="absolute top-5 right-5 cursor-pointer" src={assets.cross_icon} alt="Close" />
      </form>
    </div>
  );
};

export default RecruiterLogin;
