import Image from 'next/image';

const buildDate = new Date().toISOString().slice(0, 10);

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center py-8 bg-transparent mt-8">
      <Image
        src="/1.png"
        alt="DEVCHANBIN"
        width={180}
        height={60}
        style={{ objectFit: 'cover', objectPosition: 'top center', overflow: 'hidden' }}
      />
      <div className="mt-0 text-center text-gray-500 text-sm">
        © DEVCHANBIN, All rights reserved. | Build: {buildDate}
      </div>
    </footer>
  );
} 