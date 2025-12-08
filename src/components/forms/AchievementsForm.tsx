import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCV } from "../../context/useCV";
import { useState, useEffect, useMemo } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useSyncFormWithCV } from "../../utils/useSyncFormWithCV";

// Schema
const schema = z.object({
  achievements: z.array(
    z.object({
      value: z.string().min(1, "Achievement cannot be empty"),
    })
  ),
});

type FormType = z.infer<typeof schema>;

export default function AchievementsForm() {
  const { cv, setCV } = useCV();
  const [isSaving, setIsSaving] = useState(false);

  const { control, register, handleSubmit, watch, reset, formState } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: useMemo(
      () =>
        cv.achievements?.length
          ? { achievements: cv.achievements.map((a) => ({ value: a })) }
          : { achievements: [{ value: "" }] },
      [cv.achievements]
    ),
    mode: "onChange",
  });

  // Memoize synced slice
  const achievementsSlice = useMemo(() => {
    return cv.achievements?.length
      ? { achievements: cv.achievements.map((a) => ({ value: a })) }
      : { achievements: [{ value: "" }] };
  }, [cv.achievements]);

  useSyncFormWithCV(achievementsSlice, reset);

  const { fields, append, remove } = useFieldArray<FormType>({
    control,
    name: "achievements",
  });

  const watchedAchievements = watch("achievements");
  const debouncedAchievements = useDebounce(watchedAchievements, 500);

  useEffect(() => {
    if (!formState.isDirty) return;
    setIsSaving(true);
    setCV((prev) => ({
      ...prev,
      achievements: debouncedAchievements.map((a) => a.value),
    }));
    const timer = setTimeout(() => setIsSaving(false), 200);
    return () => clearTimeout(timer);
  }, [debouncedAchievements, setCV, formState.isDirty]);

  const onSave = handleSubmit((data) => {
    setIsSaving(true);
    setCV((prev) => ({
      ...prev,
      achievements: data.achievements.map((a) => a.value),
    }));
    setIsSaving(false);
  });

  return (
    <>
      {/* Responsive styles */}
      <style>
        {`
          .form-wrapper {
            background: #ffffff;
            padding: 1.5rem;
            border-radius: 1rem;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            max-width: 700px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
            width: 100%;
          }

          @media (min-width: 640px) {
            .form-wrapper {
              padding: 2rem;
            }
          }

          .field-row {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          @media (min-width: 600px) {
            .field-row {
              flex-direction: row;
              gap: 0.75rem;
              align-items: center;
            }
          }

          .input {
            flex: 1;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            border: 1px solid #d1d5db;
            font-size: 1rem;
            transition: all 0.2s ease-in-out;
            width: 100%;
          }

          .input:focus {
            border-color: #4f46e5;
            box-shadow: 0 0 0 2px rgba(79,70,229,0.2);
          }

          .btn {
            padding: 0.65rem 1.25rem;
            font-size: 0.95rem;
            font-weight: 600;
            border-radius: 0.75rem;
            cursor: pointer;
            border: none;
            transition: all 0.2s ease-in-out;
            width: 100%;
          }

          @media (min-width: 600px) {
            .btn {
              width: auto;
            }
          }

          .btn-primary {
            background: #4f46e5;
            color: white;
          }

          .btn-secondary {
            background: #e0e7ff;
            color: #4f46e5;
          }

          .btn-remove {
            background: #fee2e2;
            color: #b91c1c;
          }
        `}
      </style>

      <form onSubmit={onSave} className="form-wrapper">
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1f2937" }}>
          Achievements
        </h2>

        {fields.map((f, idx) => (
          <div key={f.id} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <div className="field-row">
              <input
                {...register(`achievements.${idx}.value`)}
                placeholder={`Achievement ${idx + 1}`}
                className="input"
              />

              <button
                type="button"
                className="btn btn-remove"
                onClick={() => remove(idx)}
              >
                Remove
              </button>
            </div>

            {formState.errors.achievements?.[idx]?.value && (
              <span style={{ color: "#ef4444", fontSize: "0.875rem" }}>
                {formState.errors.achievements[idx].value?.message}
              </span>
            )}
          </div>
        ))}

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginTop: "1rem",
          }}
        >
          <button type="button" className="btn btn-secondary" onClick={() => append({ value: "" })}>
            Add Achievement
          </button>

          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Achievements"}
          </button>
        </div>
      </form>
    </>
  );
}
