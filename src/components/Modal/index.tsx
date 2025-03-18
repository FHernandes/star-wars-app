import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Skeleton } from 'antd';

import { getCharacter, getHomeworld } from '../../api/swapi';
import { getCharacterByName } from '../../api/databank';
import defaultAvatar from '../../assets/star-wars-avatar.jpg';
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ItemContainer,
  SubItemContainer,
  CloseButton,
  ImageContainer,
} from './style';

interface ModalProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  id: number;
}

const Modal = ({ isOpen, onClose, id }: ModalProps) => {
  if (!isOpen) return null;

  const [currentImage, setCurrentImage] = useState(defaultAvatar);

  const { data, isLoading } = useQuery({
    queryKey: ['getCharacter', id],
    queryFn: () => getCharacter(id),
    staleTime: 5 * 60 * 1000, // 5 minutes of cache
  });

  const {
    mutate: fetchHomeworld,
    data: homeworldData,
    isPending: isPendingHomeworld,
  } = useMutation({
    mutationFn: (url: string) => getHomeworld(url),
  });

  const {
    mutate: fetchCharacterData,
    data: characterData,
    isPending,
  } = useMutation({
    mutationFn: (name: string) => getCharacterByName(name),
  });

  useEffect(() => {
    if (data) {
      fetchHomeworld(data.homeworld);
      fetchCharacterData(data.name);
    }
  }, [data]);

  useEffect(() => {
    if (!isPending && characterData?.image) {
      setCurrentImage(characterData.image);
    }
  }, [isPending, characterData]);

  if (isLoading) {
    return (
      <div>
        <p>Loading..</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <p>Data failed to load!</p>
        <p>Try again later, young Padawan.</p>
      </div>
    );
  }

  const characterHeight = Number(data.height) / 100;

  return (
    <Overlay onClick={() => onClose(false)}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>{data.name}</h2>
          <CloseButton onClick={() => onClose(false)}>&times;</CloseButton>
        </ModalHeader>
        <div>
          <ImageContainer>
            {isPending ? (
              <Skeleton.Avatar active />
            ) : (
              <img src={currentImage} alt={data.name || 'default avatar'} />
            )}
          </ImageContainer>

          <ItemContainer>
            <p>Height (in meters):</p>
            <div>{characterHeight}</div>
          </ItemContainer>
          <ItemContainer>
            <p>Mass (in kg)</p>
            <div>{data.mass}</div>
          </ItemContainer>
          <ItemContainer>
            <p>Gender:</p>
            <div>{data.gender}</div>
          </ItemContainer>
          <ItemContainer>
            <p>Birth year:</p>
            <div>{data.birth_year}</div>
          </ItemContainer>
          <ItemContainer>
            <p>Appearances in films:</p>
            <div>{data.films.length}</div>
          </ItemContainer>
          <ItemContainer>
            <p>Homeworld:</p>
            {isPendingHomeworld ? (
              <div>
                <p>Loading..</p>
              </div>
            ) : (
              <div>
                <SubItemContainer>
                  <p>Name:</p>
                  <div>{homeworldData?.name}</div>
                </SubItemContainer>
                <SubItemContainer>
                  <p>Terrain:</p>
                  <div>{homeworldData?.terrain}</div>
                </SubItemContainer>
                <SubItemContainer>
                  <p>Climate:</p>
                  <div>{homeworldData?.climate}</div>
                </SubItemContainer>
                <SubItemContainer>
                  <p>Population:</p>
                  <div>{homeworldData?.population}</div>
                </SubItemContainer>
              </div>
            )}
          </ItemContainer>
        </div>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
