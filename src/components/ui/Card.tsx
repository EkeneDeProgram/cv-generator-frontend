import React from "react";

export const Card: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-xl p-6">
    {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}
    {children}
  </div>
);
