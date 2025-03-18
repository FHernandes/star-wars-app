import styled from 'styled-components';
import * as color from '../../common/colors';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7); /* Opacidade mais intensa */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: #1a1a2e;
  min-width: 420px;
  max-width: 650px;
  width: 100%;
  padding: 24px;
  border-radius: 12px;
  position: relative;
  color: ${color.black};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  animation: fadeIn 0.3s ease-in-out;
  max-height: 90vh;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: rgb(136, 117, 34) #1a1a2e;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a2e;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffcc00;
    border-radius: 10px;
    border: 2px solid #1a1a2e;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 12px;
  margin-bottom: 16px;

  h2 {
    font-size: 24px;
    color: #f8f8f8;
    font-weight: bold;
  }
`;

export const CloseButton = styled.button`
  font-size: 28px;
  border: none;
  background: none;
  cursor: pointer;
  color: #ffcc00;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ff6600;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;

  img {
    width: 340px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.2);
  }
`;

export const ItemContainer = styled.div`
  width: 100%;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #eaeaea;
`;

export const SubItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 120px auto; /* Define colunas fixas e responsivas */
  gap: 8px 16px; /* Espaço entre os itens */
  font-size: 14px;
  color: #eaeaea;
  align-items: center; /* Garante alinhamento vertical */

  /* Responsividade */
  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* Em telas menores, transforma em lista vertical */
  }
`;
