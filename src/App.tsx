import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { searchCharacterByName } from './api/swapi';
import { CharacterTable, FilterDropdown } from './components';
import { useSpecies, useHomeworld, useStarship, useSearchCharacter } from './common/hooks';
import { CharacterList } from './common/types';
import { filterCharacter } from './common/utils';
import GlobalStyle from './styles/GlobalStyles';
import { Container, FilterContainer, SearchContainer, Input } from './styles';

interface filterValue {
  name: string;
  url: string;
}

function App() {
  const [name, setName] = useState('');
  const [homeworldCheck, setHomeworldCheck] = useState(Boolean);
  const [homeworldValue, setHomeworldValue] = useState<filterValue>();
  const [starshipCheck, setStarshipCheck] = useState(Boolean);
  const [starshipValue, setStarshipValue] = useState<filterValue>();
  const [specieCheck, setSpecieCheck] = useState(Boolean);
  const [specieValue, setSpecieValue] = useState<filterValue>();
  const [page, setPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [tableData, setTableData] = useState<CharacterList>();

  const queryClient = useQueryClient();

  const {
    mutate: fetchCharacter,
    data: characterData,
    isPending,
  } = useMutation({
    mutationFn: () => searchCharacterByName(name, page),
  });

  useEffect(() => {
    if (!isPending && characterData) {
      if (!homeworldValue) {
        setHomeworldValue(undefined);
      }
      if (!starshipValue) setStarshipValue(undefined);
      if (!specieValue) setSpecieValue(undefined);
      setTableData(characterData);
    }
  }, [characterData, homeworldCheck, homeworldValue]);

  const { data: searchData, isLoading: isLoadingSearch } = useSearchCharacter(name);

  const { data: homeworldData } = useHomeworld();

  const { data: starshipData } = useStarship();

  const { data: speciesData } = useSpecies();

  const handleSearch = () => {
    setPage(1);
    fetchCharacter();
  };

  const handleFilter = () => {
    const filteredData = filterCharacter({
      characterData: searchData ? searchData : [],
      homeworldCheck,
      homeworldValue: homeworldValue ?? { name: '', url: '' },
      specieCheck,
      specieValue: specieValue ?? { name: '', url: '' },
      starshipCheck,
      starshipValue: starshipValue ?? { name: '', url: '' },
    });

    if (!filteredData || filteredData?.pages[0]?.results?.length === 0) {
      setTableData({ pages: [], pageParams: [] });
      return;
    }

    setTableData(filteredData?.pages[0] || null);

    queryClient.invalidateQueries({ queryKey: ['getCharacterList'] });
  };

  return (
    <Container>
      <GlobalStyle />
      <h1>Star Wars</h1>

      <SearchContainer>
        <Input
          placeholder="Search your favorite character..."
          onChange={(element) => setName(element.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </SearchContainer>
      {/* {tableData && ( */}
      <FilterContainer>
        <FilterDropdown
          searchValue={name}
          label="Homeworld"
          selectedValue={homeworldValue}
          setSelectedValue={setHomeworldValue}
          data={homeworldData}
          checked={homeworldCheck}
          setChecked={setHomeworldCheck}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          searchData={searchData}
          isLoadingSearch={isLoadingSearch}
        />

        <FilterDropdown
          searchValue={name}
          label="Starship"
          selectedValue={starshipValue}
          setSelectedValue={setStarshipValue}
          data={starshipData}
          checked={starshipCheck}
          setChecked={setStarshipCheck}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          searchData={searchData}
          isLoadingSearch={isLoadingSearch}
        />

        <FilterDropdown
          searchValue={name}
          label="Specie"
          selectedValue={specieValue}
          setSelectedValue={setSpecieValue}
          data={speciesData}
          checked={specieCheck}
          setChecked={setSpecieCheck}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          setTableData={setTableData}
          searchData={searchData}
          isLoadingSearch={isLoadingSearch}
        />
      </FilterContainer>
      <button onClick={handleFilter}>Filter</button>

      <CharacterTable
        filteredCharacters={tableData}
        isLoadingSearch={isPending}
        searchPage={page}
        setSearchPage={setPage}
        handleSearch={fetchCharacter}
      />
    </Container>
  );
}

export default App;
