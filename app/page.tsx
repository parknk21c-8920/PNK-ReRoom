import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StyleGallery from '@/components/StyleGallery';
import HowItWorks from '@/components/HowItWorks';
import Studio from '@/components/Studio';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const isSuccess = resolvedParams?.success === 'true';
  const credits = resolvedParams?.credits;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {isSuccess && (
        <div className="sticky top-[68px] z-30 w-full bg-emerald-500 py-3 text-center text-sm font-bold text-white shadow-md">
          🎉 결제가 성공적으로 완료되었습니다! (추가된 크레딧: {credits}개)
        </div>
      )}
      <main className="flex-1">
        <Hero />
        <StyleGallery />
        <HowItWorks />
        <Studio />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
