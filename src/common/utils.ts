import { Character, CharacterList } from './types';

interface filterProps {
  characterData: CharacterList;
  homeworldCheck: boolean;
  homeworldValue: { name: string; url: string };
  specieCheck: boolean;
  specieValue: { name: string; url: string };
  starshipCheck: boolean;
  starshipValue: { name: string; url: string };
}

export const filterCharacter = ({
  characterData,
  homeworldCheck,
  homeworldValue,
  specieCheck,
  specieValue,
  starshipCheck,
  starshipValue,
}: filterProps): CharacterList => {
  if (!characterData?.pages) return characterData;

  const filteredResults = characterData.pages.flatMap((page) =>
    page.results.filter((character: Character) => {
      const matchesHomeworld =
        homeworldCheck && homeworldValue?.url ? character.homeworld === homeworldValue.url : true;

      const matchesSpecies =
        specieCheck && specieValue?.url
          ? character.species.some((speciesUrl) => speciesUrl === specieValue.url)
          : true;

      const matchesStarship =
        starshipCheck && starshipValue?.url
          ? character.starships.some((starshipUrl) => starshipUrl === starshipValue.url)
          : true;

      return matchesHomeworld && matchesSpecies && matchesStarship;
    }),
  );

  // If there are no filtered characters, it returns the empty structure.
  if (filteredResults.length === 0) {
    return { ...characterData, pages: [] };
  }

  // Divides the filtered characters into groups of up to 10 per page
  const paginatedResults = [];
  for (let i = 0; i < filteredResults.length; i += 10) {
    paginatedResults.push({
      count: filteredResults.length,
      next:
        i + 10 < filteredResults.length
          ? `https://swapi.dev/api/people/?search=&page=${Math.floor(i / 10) + 2}`
          : null,
      previous: i > 0 ? `https://swapi.dev/api/people/?search=&page=${Math.floor(i / 10)}` : null,
      results: filteredResults.slice(i, i + 10),
    });
  }

  return {
    pages: paginatedResults,
    pageParams: paginatedResults.map((_, index) => (index + 1).toString()),
  };
};
