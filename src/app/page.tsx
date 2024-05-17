import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <section>
      <Header />
      <div className='bg-black'>hi</div>
      <Footer />
    </section>
  );
}

//flex min-h-screen flex-col items-center justify-between p-24