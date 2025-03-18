import env from '../../common/enviroments';
import { Character, CharacterList } from '../../common/types/character';
import { Planet } from '../../common/types/homeworld';
import { SpeciesList } from '../../common/types/species';
import { StarshipList } from '../../common/types/starships';

const mainUrl = env.SWAPI_API;

export const getCharacterList = async (page: number): Promise<CharacterList> => {
  const url = `${mainUrl}/people?page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error loading the list of characters: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading the list of characters:', error);
    throw error;
  }
};

export const getPlanetList = async ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<StarshipList> => {
  const url = `${mainUrl}/planets?page=${pageParam}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error loading the list of HOMEWORLDS: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading the list of HOMEWORLDS:', error);
    throw error;
  }
};

export const getStarshipsList = async ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<StarshipList> => {
  const url = `${mainUrl}/starships?page=${pageParam}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error loading the list of STARSHIPS: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading the list of STARSHIPS:', error);
    throw error;
  }
};

export const getSpeciesList = async ({
  pageParam = 1,
}: {
  pageParam: number;
}): Promise<SpeciesList> => {
  const url = `${mainUrl}/species?page=${pageParam}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error loading the list of SPECIES: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading the list of SPECIES:', error);
    throw error;
  }
};

export const getCharacter = async (id: number): Promise<Character> => {
  const url = `${mainUrl}/people/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error searching character: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching character:', error);
    throw error;
  }
};

export const getHomeworld = async (url: string): Promise<Planet> => {
  // example => url = `${mainUrl}/planet/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error searching planet: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching planet:', error);
    throw error;
  }
};

export const searchCharacterByName = async (name: string, page: number): Promise<CharacterList> => {
  const url = `${mainUrl}/people/?search=${name}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error searching the name of character: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching the name of character:', error);
    throw error;
  }
};
