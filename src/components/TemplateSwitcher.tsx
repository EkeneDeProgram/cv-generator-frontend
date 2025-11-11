// import { useCV } from "../context/useCV";

// const templates = [
//   "classic",
//   "modern",
//   "creative",
//   "two-column",
//   "card-based",
//   "two-column-pro",
//   "modern-pro",
//   "card-based-pro",
// ] as const;

// // ✅ Add onChange prop for external callback
// type TemplateSwitcherProps = {
//   onChange?: (template: string) => void;
// };

// export default function TemplateSwitcher({ onChange }: TemplateSwitcherProps) {
//   const { cv, setCV } = useCV();

//   const handleClick = (template: typeof templates[number]) => {
//     // Update CV context
//     setCV(prev => ({ ...prev, template }));
//     // Call external callback if provided
//     onChange?.(template);
//   };

//   return (
//     <div className="flex gap-2">
//       {templates.map(t => (
//         <button
//           key={t}
//           className={`px-3 py-1 rounded ${
//             cv.template === t ? "bg-indigo-600 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => handleClick(t)}
//         >
//           {t}
//         </button>
//       ))}
//     </div>
//   );
// }


import { useCV } from "../context/useCV";

// All available templates
const templates = [
  "classic",
  "modern",
  "creative",
  "two-column",
  "card-based",
  "two-column-pro",
  "modern-pro",
  "card-based-pro",
] as const;

type TemplateType = typeof templates[number];

type TemplateSwitcherProps = {
  onChange?: (template: TemplateType) => void;
};

export default function TemplateSwitcher({ onChange }: TemplateSwitcherProps) {
  const { cv, setCV } = useCV();

  const handleClick = (template: TemplateType) => {
    // Update CV context
    setCV(prev => ({ ...prev, template }));
    // Call external callback if provided
    onChange?.(template);
  };

  return (
    <div className="flex gap-2">
      {templates.map(t => (
        <button
          key={t}
          className={`px-3 py-1 rounded ${
            cv.template === t ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleClick(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
