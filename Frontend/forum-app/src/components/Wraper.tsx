export default function Wraper({ children }: any) {
  return (
    <main
      className={`flex flex-col w-full max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-12 mt-10 items-center justify-center `}
    >
      {children}
    </main>
  );
}
