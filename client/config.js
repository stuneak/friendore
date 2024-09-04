export const isDev = process.env.FRONTEND_ENV === 'dev';
export const SECURE_CONNECTION = !isDev;

const websocketProtocol = SECURE_CONNECTION ? 'wss://' : 'ws://';
// websocket
export const websocketURL = `${websocketProtocol}${process.env.DOMAIN}`;

export const apiURL = `/api`;
export const auth = `${apiURL}/auth`;

// AUTH
export const registerLocalURL = `${auth}/register/local`;
export const registerGoogleURL = `${auth}/register/google`;
export const loginLocalURL = `${auth}/login/local`;
export const logoutURL = `${auth}/logout`;

// AUTH html routes

export const loginGoogleURL = `${auth}/login/google`;
export const onboardingGoogleURL = `${auth}/register/google`;

// PROFILE
export const profileURL = `${apiURL}/profile`;
export const profileUnsubscribeURL = `${profileURL}/unsubscribe`;

// MATCH
export const connectionURL = `${apiURL}/match`;

// FRIENDS
export const friendURL = `${apiURL}/friend`;

// ADMIN
export const admin_userProfiles = `${apiURL}/admin/profile`;
