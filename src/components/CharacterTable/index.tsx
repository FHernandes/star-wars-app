import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getCharacterList } from '../../api/swapi';
import { Character, CharacterList } from '../../common/types/character';
import { useIsMobile } from '../../common/hooks';
import darthVaderIcon from '../../assets/darth-vader-icon.png';
import sadBabyYoda from '../../assets/sad-baby-yoda.jpg';

import {
  TitleContainer,
  Container,
  InfoButton,
  PaginationContainer,
  Button,
  Page,
  WarnContainer,
  TableContainer,
} from './style';
import Modal from '../Modal';

interface CharacterTableProps {
  filteredCharacters?: CharacterList;
  isLoadingSearch: boolean;
  searchPage: number;
  setSearchPage: (page: number) => void;
  handleSearch: () => void;
}

const CharacterTable = ({
  filteredCharacters,
  isLoadingSearch,
  searchPage,
  setSearchPage,
  handleSearch,
}: CharacterTableProps) => {
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [characterModalId, setCharacterModalId] = useState<number>(5);

  const isMobileScreen = useIsMobile();

  useEffect(() => {
    setPage(searchPage);
  }, [searchPage]);

  const { data, isLoading } = useQuery({
    queryKey: ['getCharacterList', page],
    queryFn: () => getCharacterList(page),
    staleTime: 5 * 60 * 1000, // 5 minutes of cache
    enabled: !filteredCharacters,
  });

  const characterList = filteredCharacters ? filteredCharacters?.results : data?.results;
  const characterCount = filteredCharacters?.count;

  const handleChangePage = (isPrevious: boolean) => {
    if (filteredCharacters) {
      // Update the page for searches
      const newPage = isPrevious ? searchPage - 1 : searchPage + 1;
      setSearchPage(newPage);
      handleSearch();
    } else {
      // Update the page to normal listing
      setPage(isPrevious ? page - 1 : page + 1);
    }
  };

  const extractIdFromUrl = (url: string): number | null => {
    const match = url.match(/\/(\d+)\/$/);
    return match ? Number(match[1]) : null;
  };

  const handleViewMore = (url: string) => {
    const id = extractIdFromUrl(url);

    if (id !== null) {
      setCharacterModalId(id);
      setOpenModal(true);
    }
  };

  if (isLoading || isLoadingSearch) {
    return (
      <WarnContainer>
        <img src={darthVaderIcon} alt="Darth Vader Icon" />
        <p>Loading..</p>
      </WarnContainer>
    );
  }

  if (!characterList) {
    return (
      <WarnContainer>
        <p>Data failed to load!</p>
        <p>Try again later, young Padawan.</p>
        <img src={sadBabyYoda} alt="Darth Vader Icon" />
      </WarnContainer>
    );
  }

  if (filteredCharacters === null || (filteredCharacters && characterCount === 0)) {
    return (
      <WarnContainer>
        <p>No data found!</p>
        <p>Try another combination, young Padawan.</p>
      </WarnContainer>
    );
  }
  return (
    <>
      <TableContainer>
        <TitleContainer>
          <div>Name</div>
          <div style={{ display: isMobileScreen ? 'none' : 'block' }}>Birthday</div>
          <div style={{ display: isMobileScreen ? 'none' : 'block' }}>Films</div>
          <div>Info</div>
        </TitleContainer>
        <div>
          {characterList.map((character: Character) => {
            return (
              <Container key={character.url}>
                <div>{character.name}</div>
                <div style={{ display: isMobileScreen ? 'none' : 'block' }}>
                  {character.birth_year}
                </div>
                <div style={{ display: isMobileScreen ? 'none' : 'block' }}>
                  {character.films.length}
                </div>
                <div>
                  <InfoButton onClick={() => handleViewMore(character.url)}>View more</InfoButton>
                </div>
              </Container>
            );
          })}
        </div>
        <PaginationContainer>
          <Button onClick={() => handleChangePage(true)} disabled={!data?.previous}>
            Back
          </Button>
          <Page>{page}</Page>
          <Button
            onClick={() => handleChangePage(false)}
            disabled={filteredCharacters ? !filteredCharacters.next : !data?.next}
          >
            Next
          </Button>
        </PaginationContainer>
      </TableContainer>
      <Modal isOpen={openModal} onClose={setOpenModal} id={characterModalId} />
    </>
  );
};

export default CharacterTable;
