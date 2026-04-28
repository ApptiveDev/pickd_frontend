import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import MainScreen from "./screens/MainScreen";
import ExperienceScreen from "./screens/ExperienceScreen";
import AiScreen from "./screens/AiScreen";
import { ApplicationProvider } from "./context/ApplicationContext";

function App() {
  const [page, setPage] = useState<"main" | "experience" | "ai">("main");

  return (
    <ApplicationProvider>
      <Layout onNavigate={setPage}>
        {page === "main" && <MainScreen />}
        {page === "experience" && <ExperienceScreen />}
        {page === "ai" && <AiScreen />}
      </Layout>
    </ApplicationProvider>
  );
}

export default App;
