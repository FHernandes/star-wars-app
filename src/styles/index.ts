import styled from 'styled-components';
import * as color from '../common/colors';
import device from '../common/mediaqueries';

export const Container = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    height: 32px;
  }

  @media ${device.mobile} {
    width: 100%;
    padding: 20px;
  }
`;

export const SearchContainer = styled.div`
  width: 100%;
  padding: 0 10%;
  margin-bottom: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  @media ${device.mobile} {
    width: 100%;
    padding: 4px;
  }
`;

export const FilterContainer = styled.div`
  width: 100%;
  padding: 0 10px;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;

  @media ${device.mobile} {
    width: 100%;
    padding: 4px;
  }
`;

export const Input = styled.input`
  background-color: ${color.inputBackground};
  border: 1px solid ${color.primaryGray};
  color: #111827;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  width: 100%;
  padding: 0.625rem; /* p-2.5 */
  display: block;

  &:focus {
    outline: none;
    border: 1px solid ${color.red};
    box-shadow:
      0px 6px 10px rgba(242, 5, 5, 0.7),
      0px 0px 15px rgba(20, 16, 47, 0.9);
  }
`;
