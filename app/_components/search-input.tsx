"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) return;

    router.push(`/restaurant?search=${search}`);
  };

  return (
    <form className="flex gap-2 " onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar Restaurantes"
        className="border-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button size="icon" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default SearchInput;
