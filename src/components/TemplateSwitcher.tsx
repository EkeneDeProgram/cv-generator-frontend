import { useCV } from "../context/useCV";
import type { CVData, CVTemplate } from "../types/cv";

const templates: CVTemplate[] = ["modern", "twoColumn", "card"];

type TemplateSwitcherProps = {
  onChange?: (template: CVTemplate) => void;
};

export default function TemplateSwitcher({ onChange }: TemplateSwitcherProps) {
  const { cv, setCV } = useCV();

  const handleClick = (template: CVTemplate) => {
    // Safely update CV template
    setCV(prev => ({ ...prev, template: template as CVData['template'] }));
    onChange?.(template);
  };

  return (
    <div className="flex gap-2">
      {templates.map(t => (
        <button
          key={t}
          className={`px-3 py-1 rounded ${cv.template === t ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
          onClick={() => handleClick(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
