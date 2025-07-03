export default function HomeWrapper({ children }: any) {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12 mt-10">
      {children}
    </main>
  );
}
