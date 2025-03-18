import styled from 'styled-components';
import * as color from '../../common/colors';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  label {
    text-align: center;
    line-height: 12px;
    p {
      font-weight: 500;
    }
    span {
      display: block;
      font-weight: 600;
    }
  }
`;

export const Checkbox = styled.input`
  cursor: pointer;
  transform: scale(1.1);
  margin-right: 4px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  width: max-content;
  min-width: 180px;
  max-width: 250px;
  max-height: 160px;
  overflow-y: auto;
  background: #3b3962;
  border: 1px solid ${color.primaryGray};
  border-radius: 6px;
  z-index: 100;
  padding: 6px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);

  /* Adiciona um efeito de fade no scroll */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #666;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #222;
  }
`;

export const ListItem = styled.div`
  color: #ddd;
  padding: 8px;
  font-size: 14px;
  font-weight: 600;
  transition:
    background 0.2s ease-in-out,
    color 0.2s ease-in-out;
  border-radius: 4px;

  &:hover {
    background: #07fc03;
    color: black;
  }
`;
