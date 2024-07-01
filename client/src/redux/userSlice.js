// import { createSlice } from "@reduxjs/toolkit";
// import { useNavigate } from 'react-router-dom'

// const initialState = {
//   currentUser: null,
//   loading: false,
//   error: false,
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true;
//     },
//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.currentUser = action.payload.user;
//       localStorage.setItem('token', action.payload.token);
//     },
//     loginFailure: (state) => {
//       state.loading = false;
//       state.error = true;
//     },
//     logout: (state) => {
//       state.currentUser = null;
//       state.loading = false;
//       state.error = false;
//       localStorage.removeItem('token');
//     },
//     verified: (state, action) => {
//       if(state.currentUser){
//         state.currentUser.verified = action.payload;
//       }
//     },
//     subscription: (state, action) => {
//       if (state.currentUser.subscribedUsers.includes(action.payload)) {
//         state.currentUser.subscribedUsers.splice(
//           state.currentUser.subscribedUsers.findIndex(
//             (channelId) => channelId === action.payload
//           ),
//           1
//         );
//       } else {
//         state.currentUser.subscribedUsers.push(action.payload);
//       }
//     },
//   },
// });

// export const { loginStart, loginSuccess, loginFailure, logout, subscription,verified } =
//   userSlice.actions;

// export default userSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// // Snackbar Slice
// const initialStateSnackbar = {
//     open: false,
//     message: "",
//     severity: "success",
// };

// const snackbarSlice = createSlice({
//     name: 'snackbar',
//     initialState: initialStateSnackbar,
//     reducers: {
//         openSnackbar: (state, action) => {
//             state.open = true;
//             state.message = action.payload.message;
//             state.severity = action.payload.severity;
//         },
//         closeSnackbar: (state) => {
//             state.open = false;
//         }
//     }
// });

// export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;


// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: { user: null },
//   reducers: {
//     setLoginData: (state, action) => {
//       state.user = action.payload;
//     },
//   },
// });

// export const { setLoginData } = userSlice.actions;
// export default userSlice.reducer;


// // User Slice
// const initialStateUser = {
//     loginInfo: {
//         username: "Lily Watson",
//         emailOrPhone: "lily.wastons@gmail.com",
//         password: "random-password1234",
//         isSignIn: true,
//     },
//     signedUpUsers: [
//         {
//             username: "Lily Watson",
//             emailOrPhone: "lily.wastons@gmail.com",
//             password: "random-password1234",
//         },
//     ],
//     currentUser: null,
//     loading: false,
//     error: false,
// };

// const userSlice = createSlice({
//     name: "user",
//     initialState: initialStateUser,
//     reducers: {
//         newSignUp: (state, { payload }) => {
//             state.signedUpUsers = payload;
//             state.loginInfo.isSignIn = true;
//         },
//         setLoginData: (state, { payload }) => {
//             state.loginInfo = { ...payload };
//             state.loginInfo.isSignIn = true;
//         },
//         signOut: (state) => {
//             const guestData = {
//                 username: "",
//                 emailOrPhone: "",
//                 password: "",
//             };
//             state.loginInfo = guestData;
//             state.loginInfo.isSignIn = false;
//         },
//         updateUserData: (state, { payload }) => {
//             Object.assign(state.loginInfo, payload.updatedUserData);
//         },
//         loginStart: (state) => {
//             state.loading = true;
//         },
//         loginSuccess: (state, action) => {
//             state.loading = false;
//             state.currentUser = action.payload.user;
//             localStorage.setItem('token', action.payload.token);
//         },
//         loginFailure: (state) => {
//             state.loading = false;
//             state.error = true;
//         },
//         logout: (state) => {
//             state.currentUser = null;
//             state.loading = false;
//             state.error = false;
//             localStorage.removeItem('token');
//         },
//         verified: (state, action) => {
//             if(state.currentUser){
//                 state.currentUser.verified = action.payload;
//             }
//         },
//         subscription: (state, action) => {
//             if (state.currentUser.subscribedUsers.includes(action.payload)) {
//                 state.currentUser.subscribedUsers.splice(
//                     state.currentUser.subscribedUsers.findIndex(
//                         (channelId) => channelId === action.payload
//                     ),
//                     1
//                 );
//             } else {
//                 state.currentUser.subscribedUsers.push(action.payload);
//             }
//         },
//     },
// });

// export const {
//     newSignUp,
//     setLoginData,
//     signOut,
//     updateUserData,
//     loginStart,
//     loginSuccess,
//     loginFailure,
//     logout,
//     subscription,
//     verified
// } = userSlice.actions;

// // Combine Reducers
// const rootReducer = {
//     user: userSlice.reducer,
//     snackbar: snackbarSlice.reducer
// };

// export default rootReducer;


// Initial state for the user slice
// const initialState = {
//   loginInfo: {
//     username: "",
//     emailOrPhone: "",
//     password: "",
//     isSignIn: false,
//   },
//   signedUpUsers: [],
//   currentUser: null,
//   loading: false,
//   error: false,
// };

// // Create user slice
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     // Reducer for signing up a new user
//     newSignUp: (state, action) => {
//       state.signedUpUsers.push(action.payload);
//       state.loginInfo.isSignIn = true;
//     },
//     // Reducer for setting login data
//     setLoginData: (state, action) => {
//       state.loginInfo = action.payload;
//       state.loginInfo.isSignIn = true;
//     },
//     // Reducer for signing out
//     signOut: (state) => {
//       state.loginInfo = {
//         username: "",
//         emailOrPhone: "",
//         password: "",
//         isSignIn: false,
//       };
//       state.currentUser = null;
//     },
//     // Reducer for login start
//     loginRequest(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess(state, action) {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload;
//     },
//     loginFailure(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//     // Reducer for updating user data
//     updateUserData: (state, action) => {
//       state.currentUser = { ...state.currentUser, ...action.payload };
//     },
//     // Add other reducers as needed
//   },
// });

// // Export actions
// export const {
//   newSignUp,
//   setLoginData,
//   signOut,
//   loginRequest,
//   loginSuccess,
//   loginFailure,
//   logout,
//   updateUserData,
// } = userSlice.actions;

// // Export reducer
// export default userSlice.reducer;
