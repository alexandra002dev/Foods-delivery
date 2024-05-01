import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import SearchInput from "./_components/search-input";

const Home = () => {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <SearchInput />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-1 pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto"
          width={0}
          height={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>
    </>
  );
};
export default Home;
