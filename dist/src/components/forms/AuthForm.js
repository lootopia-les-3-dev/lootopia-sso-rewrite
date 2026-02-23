import { jsx as _jsx, jsxs as _jsxs } from "hono/jsx/jsx-runtime";
export const AuthForm = ({ email, callbackUrl }) => {
    return (_jsxs("form", { method: "post", action: "/api/auth", children: [callbackUrl && _jsx("input", { type: "hidden", name: "callback_url", value: callbackUrl }), _jsxs("div", { class: "form-group", children: [_jsx("label", { for: "email", children: "Email" }), _jsx("input", { id: "email", type: "email", name: "email", value: email || "", placeholder: "votre@email.com", required: true })] }), _jsx("input", { type: "submit", value: "Continuer" })] }));
};
