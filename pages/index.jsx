import dynamic from 'next/dynamic';

const CryptoSharkLanding = dynamic(
  () => import('../components/CryptoSharkLanding'),
  { ssr: false }
);

export default function Home() {
  return <CryptoSharkLanding />;
}
