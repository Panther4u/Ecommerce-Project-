import axios from "axios";

// Define API base URL
const API = axios.create({ baseURL: process.env.baseURL || "http://localhost:5001/api" });


// export const googleLogin = async (userData) => {
//     try {
//       const response = await axios.post('/api/auth/google-signin', userData);
//       return response;
//     } catch (error) {
//       console.error('Error during Google sign-in:', error);
//       throw error;
//     }
//   };

// //auth
export const signIn = async ({ email, password }) => await API.post('/auth/signin', { email, password });
export const signUp = async ({
    name,
    email,
    password,
}) => await API.post('/auth/signup', {
    name,
    email,
    password,
});
export const googleLogin = async ({
    name,
    email,
    img,
}) => await API.post('/auth/google', {
    name,
    email,
    img,
},{ withCredentials: true });
// export const findUserByEmail = async (email) => await API.get(`/auth/findbyemail?email=${email}`);
// export const generateOtp = async (email,name,reason) => await API.get(`/auth/generateotp?email=${email}&name=${name}&reason=${reason}`);
// export const verifyOtp = async (otp) => await API.get(`/auth/verifyotp?code=${otp}`);
// export const resetPassword = async (email,password) => await API.put(`/auth/forgetpassword`,{email,password});


// import axios from "axios";

// const API = axios.create({ baseURL: `http://localhost:5001/api` }); 



// //auth
// export const signIn = async ({ email, password }) => await API.post('/auth/signin', { email, password });
// export const signUp = async ({
//     name,
//     email,
//     password,
// }) => await API.post('/auth/signup', {
//     name,
//     email,
//     password,
// });
// export const googleSignIn = async ({
//     name,
//     email,
//     img,
// }) => await API.post('/auth/google', {
//     name,
//     email,
//     img,
// },{ withCredentials: true });
// export const findUserByEmail = async (email) => await API.get(`/auth/findbyemail?email=${email}`);
// export const generateOtp = async (email,name,reason) => await API.get(`/auth/generateotp?email=${email}&name=${name}&reason=${reason}`);
// export const verifyOtp = async (otp) => await API.get(`/auth/verifyotp?code=${otp}`);
// export const resetPassword = async (email,password) => await API.put(`/auth/forgetpassword`,{email,password});
