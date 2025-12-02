// Triggers a client-side download of arbitrary data as a file.

export function downloadBlob(blobData: BlobPart, mime: string, filename: string) {
  // Create a Blob from the data
  const blob = new Blob([blobData], { type: mime });

  // Generate a temporary URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a hidden anchor element
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  
  // Append to DOM, trigger click to start download, then remove element
  document.body.appendChild(a);
  a.click();
  a.remove();

  // Release memory used by the object URL
  URL.revokeObjectURL(url);
}
