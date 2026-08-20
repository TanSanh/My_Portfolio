import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import i18n from "./i18n";
import { Layout } from "./components/layout/Layout";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";
import { AdminLogin } from "./pages/admin/Login";
import { DashboardLayout } from "./pages/admin/DashboardLayout";
import { Dashboard } from "./pages/admin/Dashboard";
import { Contacts } from "./pages/admin/Contacts";
import { Projects as AdminProjects } from "./pages/admin/Projects";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    (window as any).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Routes>
        {/* Portfolio Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </Layout>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/admin/contacts" element={<DashboardLayout />}>
          <Route index element={<Contacts />} />
        </Route>
        <Route path="/admin/projects" element={<DashboardLayout />}>
          <Route index element={<AdminProjects />} />
        </Route>
      </Routes>
    </I18nextProvider>
  );
}

export default App;
