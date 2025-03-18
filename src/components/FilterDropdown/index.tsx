import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { Container, Dropdown, Checkbox, ListItem } from './style';
import { CharacterList, PlanetList, SpeciesList, StarshipList } from '../../common/types';

interface FilterDropdownProps {
  label: string;
  checked: boolean;
  setChecked: (value: boolean) => void;
  selectedValue: { name: string; url: string } | undefined;
  setSelectedValue: (value: { name: string; url: string }) => void;
  data: {
    pageParam: number[];
    pages: PlanetList[] | SpeciesList[] | StarshipList[] | undefined;
  };
  isLoading?: boolean;
  openDropdown: string | null;
  setOpenDropdown: (value: string | null) => void;
  searchData: CharacterList;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  checked,
  setChecked,
  selectedValue,
  setSelectedValue,
  data,
  isLoading,
  openDropdown,
  setOpenDropdown,
  searchData,
}) => {
  const [primaryGray, setDescription] = useState<ReactElement>();
  const [filteredItems, setFilteredItems] = useState<{ name: string; url: string }[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpen = openDropdown === label;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const keyMap: Record<string, string> = {
    Homeworld: 'homeworld',
    Starship: 'starships',
    Specie: 'species',
  };

  const key = keyMap[label];

  useEffect(() => {
    if (!searchData || !key) return;

    const updatedItems: { name: string; url: string }[] = [];

    searchData.pages.forEach((page) => {
      page.results.forEach((character: any) => {
        if (!character[key]) return;

        if (Array.isArray(character[key])) {
          // Array
          character[key].forEach((url: string) => {
            const match = data?.pages.flatMap((p) => p.results).find((item) => item.url === url);

            if (match && !updatedItems.some((existing) => existing.url === match.url)) {
              updatedItems.push({ name: match.name, url: match.url });
            }
          });
        } else {
          // String
          const match = data?.pages
            .flatMap((p) => p.results)
            .find((item) => item.url === character[key]);

          if (match && !updatedItems.some((existing) => existing.url === match.url)) {
            updatedItems.push({ name: match.name, url: match.url });
          }
        }
      });
    });

    setFilteredItems(updatedItems);
  }, [searchData, data, label]);

  useEffect(() => {
    setDescription(
      selectedValue && checked ? (
        <p>
          {label}: <span>{selectedValue.name}</span>
        </p>
      ) : (
        <p>{label}</p>
      ),
    );
  }, [selectedValue, checked]);

  const handleSelectValue = (item: { name: string; url: string }) => {
    setChecked(true);
    setSelectedValue(item);
    setOpenDropdown(null);
  };

  return (
    <Container key={label} ref={dropdownRef}>
      <Checkbox
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        disabled={filteredItems.length === 0}
      />
      <label onClick={() => setOpenDropdown(isOpen ? null : label)}>{primaryGray}</label>

      {isOpen && filteredItems.length > 0 && (
        <Dropdown>
          {filteredItems.map((item) => (
            <ListItem key={item.url} onClick={() => handleSelectValue(item)}>
              {item.name}
            </ListItem>
          ))}
        </Dropdown>
      )}

      {isLoading && <p>Loading...</p>}
    </Container>
  );
};

export default FilterDropdown;
