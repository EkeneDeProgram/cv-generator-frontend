import { useCV } from "../context/useCV";
import type { CVData, CVTemplate } from "../types/cv";

const templates: CVTemplate[] = ["modern", "twoColumn", "card"];

type TemplateSwitcherProps = {
  onChange?: (template: CVTemplate) => void;
};

export default function TemplateSwitcher({ onChange }: TemplateSwitcherProps) {
  const { cv, setCV } = useCV();

  const handleClick = (template: CVTemplate) => {
    setCV(prev => ({ ...prev, template: template as CVData['template'] }));
    onChange?.(template);
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
      {templates.map(t => (
        <button
          key={t}
          className={`
            flex-1 min-w-[80px] text-center
            px-3 py-1
            sm:px-4 sm:py-2
            md:px-5 md:py-2.5
            rounded-lg
            font-medium
            transition
            ${
              cv.template === t
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }
          `}
          onClick={() => handleClick(t)}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)} {/* Capitalize */}
        </button>
      ))}
    </div>
  );
}
