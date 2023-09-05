import { Input } from "@mui/joy";
import { ChangeEvent, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSearch } from "../../src/utils/useSearch";

interface Props {
  placeholder: string;
  onSearch: (text: string) => void;
}

const SearchCase = ({ placeholder, onSearch }: Props) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useSearch(search, onSearch);

  return (
    <Input
      value={search}
      onChange={onChangeSearch}
      placeholder={placeholder}
      variant="outlined"
      size="md"
      type="text"
      endDecorator={<IoSearchOutline />}
      sx={{
        width: 300,
      }}
    />
  );
};

export default SearchCase;
