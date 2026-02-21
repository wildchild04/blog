import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DesignSystemProvider } from "@wildchild/design-system";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { AboutPage } from "./pages/AboutPage";
import { BlogHomePage } from "./pages/BlogHomePage";
import { BlogPostPage } from "./pages/BlogPostPage";

type ThemeMode = "light" | "dark";
const THEME_STORAGE_KEY = "blog-theme-mode";

function AppRouter({ mode, onToggleTheme }: { mode: ThemeMode; onToggleTheme: () => void }) {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<BlogHomePage mode={mode} onToggleTheme={onToggleTheme} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/post/:slug" element={<BlogPostPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

function App() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "dark" ? "dark" : "light";
  });
  const toggleTheme = useMemo(() => () => setMode((current) => (current === "light" ? "dark" : "light")), []);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode]);

  return (
    <DesignSystemProvider mode={mode}>
      <AppRouter mode={mode} onToggleTheme={toggleTheme} />
    </DesignSystemProvider>
  );
}

const mount = document.getElementById("react-blog-home-root");

if (mount) {
  createRoot(mount).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
