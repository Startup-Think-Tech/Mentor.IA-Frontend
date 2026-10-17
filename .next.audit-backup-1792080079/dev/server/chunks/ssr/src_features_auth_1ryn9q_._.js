module.exports = [
"[project]/src/features/auth/components/private-route.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PrivateRoute",
    ()=>PrivateRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$hooks$2f$use$2d$required$2d$auth$2d$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/hooks/use-required-auth-session.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$auth$2d$session$2e$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/context/auth-session.context.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function PrivateRoute({ children }) {
    const { session, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$hooks$2f$use$2d$required$2d$auth$2d$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRequiredAuthSession"])();
    if (isLoading || !session) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "grid min-h-dvh place-items-center bg-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "size-10 animate-spin rounded-full border-4 border-[#dbe5ff] border-t-[#2f66e9]"
            }, void 0, false, {
                fileName: "[project]/src/features/auth/components/private-route.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/features/auth/components/private-route.tsx",
            lineNumber: 12,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$context$2f$auth$2d$session$2e$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthSessionProvider"], {
        session: session,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/features/auth/components/private-route.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/features/auth/context/auth-session.context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthSessionProvider",
    ()=>AuthSessionProvider,
    "useAuthSession",
    ()=>useAuthSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const AuthSessionContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthSessionProvider({ session, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthSessionContext.Provider, {
        value: session,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/features/auth/context/auth-session.context.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
function useAuthSession() {
    const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthSessionContext);
    if (!session) {
        throw new Error("AuthSessionProvider ausente.");
    }
    return session;
}
}),
"[project]/src/features/auth/hooks/use-required-auth-session.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRequiredAuthSession",
    ()=>useRequiredAuthSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/services/auth.service.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function useRequiredAuthSession() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        session: null,
        isLoading: true
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>{
            const currentSession = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getValidSession();
            if (!currentSession) {
                router.replace("/login");
                return;
            }
            setState({
                session: currentSession,
                isLoading: false
            });
        }, 0);
        return ()=>window.clearTimeout(timer);
    }, [
        router
    ]);
    return state;
}
}),
"[project]/src/features/auth/mocks/auth.mock.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMockUser",
    ()=>getMockUser,
    "mockUser",
    ()=>mockUser,
    "setMockUser",
    ()=>setMockUser
]);
let mockUser = null;
function setMockUser(user) {
    mockUser = user;
}
function getMockUser() {
    return mockUser;
}
}),
"[project]/src/features/auth/schemas/auth.schema.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authSessionSchema",
    ()=>authSessionSchema,
    "mockUserSchema",
    ()=>mockUserSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-ssr] (ecmascript) <export * as z>");
;
const mockUserSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(3),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().email(),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(8)
});
const authSessionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    user: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1),
        email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().email()
    }),
    token: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
});
}),
"[project]/src/features/auth/schemas/login.schema.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loginSchema",
    ()=>loginSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-ssr] (ecmascript) <export * as z>");
;
const loginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1, "Informe seu e-mail.").email("Informe um e-mail válido."),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Informe sua senha.").min(8, "A senha deve ter pelo menos 8 caracteres.")
});
}),
"[project]/src/features/auth/services/auth.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authService",
    ()=>authService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$mocks$2f$auth$2e$mock$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/mocks/auth.mock.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$schemas$2f$auth$2e$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/schemas/auth.schema.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$schemas$2f$login$2e$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/schemas/login.schema.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$storage$2f$auth$2e$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/storage/auth.storage.ts [app-ssr] (ecmascript)");
;
;
;
;
function getPersistedMockUser() {
    const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$mocks$2f$auth$2e$mock$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMockUser"])();
    if (currentUser) {
        return currentUser;
    }
    const parsedUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$schemas$2f$auth$2e$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockUserSchema"].safeParse(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$storage$2f$auth$2e$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStorage"].getMockUser());
    if (!parsedUser.success) {
        return null;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$mocks$2f$auth$2e$mock$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setMockUser"])(parsedUser.data);
    return parsedUser.data;
}
async function login(input) {
    const credentials = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$schemas$2f$login$2e$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginSchema"].parse(input);
    const user = getPersistedMockUser();
    await Promise.resolve();
    if (!user) {
        throw new Error("Nenhum usuário cadastrado no mock.");
    }
    const emailMatches = user.email.toLowerCase() === credentials.email.toLowerCase();
    const passwordMatches = user.password === credentials.password;
    if (!emailMatches || !passwordMatches) {
        throw new Error("E-mail ou senha inválidos.");
    }
    const session = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$schemas$2f$auth$2e$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authSessionSchema"].parse({
        user: {
            name: user.name,
            email: user.email
        },
        token: "mock-token"
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$storage$2f$auth$2e$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStorage"].saveSession(session);
    return session;
}
function registerMockUser(user) {
    const validatedUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$schemas$2f$auth$2e$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockUserSchema"].parse(user);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$mocks$2f$auth$2e$mock$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setMockUser"])(validatedUser);
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$storage$2f$auth$2e$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStorage"].saveMockUser(validatedUser);
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$storage$2f$auth$2e$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStorage"].clearSession();
}
function getValidSession() {
    const user = getPersistedMockUser();
    const sessionResult = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$schemas$2f$auth$2e$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authSessionSchema"].safeParse(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$storage$2f$auth$2e$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStorage"].getSession());
    if (!user || !sessionResult.success) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$storage$2f$auth$2e$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStorage"].clearSession();
        return null;
    }
    const session = sessionResult.data;
    const belongsToUser = session.user.email.toLowerCase() === user.email.toLowerCase();
    if (!belongsToUser) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$storage$2f$auth$2e$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStorage"].clearSession();
        return null;
    }
    return session;
}
function logout() {
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$storage$2f$auth$2e$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStorage"].clearSession();
}
async function loginWithBackend(input) {
    const credentials = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$schemas$2f$login$2e$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginSchema"].parse(input);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_URL não configurada.");
    }
    const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });
    if (!response.ok) {
        throw new Error("E-mail ou senha inválidos.");
    }
    const session = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$schemas$2f$auth$2e$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authSessionSchema"].parse(await response.json());
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$storage$2f$auth$2e$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authStorage"].saveSession(session);
    return session;
}
const authService = {
    login,
    loginWithBackend,
    registerMockUser,
    getValidSession,
    logout
};
}),
"[project]/src/features/auth/storage/auth.storage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authStorage",
    ()=>authStorage
]);
const MOCK_USER_KEY = "mentor.ia.mock-user";
const SESSION_KEY = "mentor.ia.session";
function getLocalStorage() {
    if ("TURBOPACK compile-time truthy", 1) {
        return null;
    }
    //TURBOPACK unreachable
    ;
}
function readJson(key) {
    const storage = getLocalStorage();
    if (!storage) return null;
    const value = storage.getItem(key);
    if (!value) return null;
    try {
        return JSON.parse(value);
    } catch  {
        storage.removeItem(key);
        return null;
    }
}
const authStorage = {
    getMockUser () {
        return readJson(MOCK_USER_KEY);
    },
    saveMockUser (user) {
        getLocalStorage()?.setItem(MOCK_USER_KEY, JSON.stringify(user));
    },
    getSession () {
        return readJson(SESSION_KEY);
    },
    saveSession (session) {
        getLocalStorage()?.setItem(SESSION_KEY, JSON.stringify(session));
    },
    clearSession () {
        getLocalStorage()?.removeItem(SESSION_KEY);
    }
};
}),
];

//# sourceMappingURL=src_features_auth_1ryn9q_._.js.map