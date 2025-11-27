import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import Preview from "./pages/Preview";
import { CVProvider } from "./context/CVProvider";



export default function App() {
  return (
    <CVProvider>
      <BrowserRouter>
        <main className="max-w-6xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />  {/* FIXED */}
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CVProvider>
  );
}
