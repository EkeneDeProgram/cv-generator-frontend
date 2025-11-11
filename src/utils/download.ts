export function downloadBlob(blobData: BlobPart, mime: string, filename: string) {
  const blob = new Blob([blobData], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}
