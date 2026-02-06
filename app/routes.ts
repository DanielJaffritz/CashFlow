import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/SignIn", "routes/SignIn.tsx"),
    route("/SignUp", "routes/SignUp.tsx"),
    route("/dashboard", "routes/dashboard.tsx"),    
] satisfies RouteConfig;
