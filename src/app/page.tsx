import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <section className='flex min-h-screen flex-col items-center justify-between'>
      <Header />
      <div className="h-auto m-h-full pt-20">main contents</div>
      <Footer />
    </section>
  );
}
 