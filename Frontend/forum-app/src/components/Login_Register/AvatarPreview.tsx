export default function AvatarPreview({ file }: { file?: File }) {
  if (!file) return null;
  return (
    <img
      src={URL.createObjectURL(file)}
      alt="Preview"
      className="h-24 w-24 rounded-full object-cover"
    />
  );
}
