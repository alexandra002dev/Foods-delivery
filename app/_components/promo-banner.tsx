import Image from "next/image";

interface PromoBannerProps {
  src: string;
  alt: string;
}
const PromoBanner = ({ alt, src }: PromoBannerProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      className="h-auto w-full object-contain"
      sizes="100vw"
      quality={100}
    />
  );
};

export default PromoBanner;
