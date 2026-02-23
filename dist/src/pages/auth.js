import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
import { AuthForm } from "../components/forms/AuthForm.js";
const AuthPage = ({ email, callbackUrl }) => {
    return (_jsxs("html", { lang: "fr", children: [_jsxs("head", { children: [_jsx("meta", { charset: "UTF-8" }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }), _jsx("title", { children: "Lootopia - Connexion" }), _jsx("link", { rel: "stylesheet", href: "/styles/globals.css" })] }), _jsx("body", { children: _jsxs("div", { class: "card", children: [_jsx("h1", { children: "Connexion \u00E0 Lootopia" }), _jsx(AuthForm, { email: email, callbackUrl: callbackUrl })] }) })] }));
};
export default AuthPage;
