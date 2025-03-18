import styled from 'styled-components';
import * as color from '../../common/colors';
import device from '../../common/mediaqueries';

export const TableContainer = styled.div`
  width: 100%;
  margin-top: 16px;
`;

export const TitleContainer = styled.div`
  width: 100%;
  padding: 4px 0;
  border-top: 1px solid ${color.secondaryGray};
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;
  align-items: center;
  gap: 16px;

  @media ${device.mobile} {
    grid-template-columns: 60% 40%;
    gap: 8px;
  }
`;

export const Container = styled.div`
  width: 100%;
  padding: 4px 0;
  border-top: 1px solid ${color.secondaryGray};
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;
  align-items: center;
  gap: 16px;

  &:hover {
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.2);
  }

  @media ${device.mobile} {
    grid-template-columns: 60% 40%;
    gap: 8px;
  }
`;

export const InfoButton = styled.button`
  background-color: transparent;
  border: 1px solid ${color.tertiaryGray};
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${color.primaryGray};
  width: fit-content;
  transition: all ease-in-out 0.3s;

  &:hover {
    background-color: transparent;
    color: ${color.primaryYellow};
    border-color: ${color.primaryYellow};
  }
`;

export const PaginationContainer = styled.div`
  width: 100%;
  padding: 60px;

  display: flex;
  gap: 10px;
  justify-content: space-between;

  @media ${device.mobile} {
    padding: 10px;
  }
`;

export const Button = styled.button`
  height: 30px;
  background-color: ${color.primaryYellow};
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${color.secondaryYellow};
  }
`;

export const Page = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  padding: 8px 16px;
  border: 1px solid ${color.primaryYellow};
  border-radius: 4px;
  text-align: center;
`;

export const WarnContainer = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  font-size: 24px;
  font-weight: 600;

  img {
    max-width: 320px;
  }
`;
