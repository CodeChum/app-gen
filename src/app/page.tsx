import Form from '@/components/form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-16 p-24 pt-32 bg-card">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-6xl text-card-foreground font-extrabold">
          App Generator
        </h1>
        <p className="text-xl text-muted-foreground">
          See how easy it is to generate AI apps!
        </p>
      </div>
      <Form />
    </main>
  );
}
