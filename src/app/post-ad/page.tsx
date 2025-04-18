// app/post-ad/page.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdForm from '@/components/AdForm';

export default function PostAdPage() {
  return (
    <div>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <AdForm />
      </main>
      <Footer />
    </div>
  );
}
