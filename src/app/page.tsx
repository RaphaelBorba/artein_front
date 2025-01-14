import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="flex  min-h-96 flex-col items-center rounded-lg bg-white p-10 shadow-lg">
        <Image alt="logo" src="/logo.jpeg" width={200} height={200} />
        <h2 className="font-bold">FAÇA SEU LOGIN</h2>
      </div>
      
    </main>
  );
}
