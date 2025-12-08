// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Builder from "./pages/Builder";
// import Preview from "./pages/Preview";
// import { CVProvider } from "./context/CVProvider";


// /* Root component of the CV Generator frontend application. */

// export default function App() {
//   return (
//     // Global CV context provider for state management across the app
//     <CVProvider>
//       <BrowserRouter>
//         <main className="max-w-6xl mx-auto p-4">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/builder" element={<Builder />} />  {/* FIXED */}
//             <Route path="/preview" element={<Preview />} />
//           </Routes>
//         </main>
//       </BrowserRouter>
//     </CVProvider>
//   );
// }



import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import Preview from "./pages/Preview";
import { CVProvider } from "./context/CVProvider";

/* Root component of the CV Generator frontend application. */

export default function App() {
  return (
    // Global CV context provider for state management across the app
    <CVProvider>
      <BrowserRouter>
        <main className="w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mx-auto max-w-full md:max-w-6xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CVProvider>
  );
}
