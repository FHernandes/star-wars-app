import { createGlobalStyle } from 'styled-components';
import * as color from '../common/colors';
import device from '../common/mediaqueries';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
  }

  body {
    font-family: 'Orbitron', sans-serif;
    background-color: #14102f;
    color: ${color.primaryGray};
  }

  h1 {
    color: ${color.primaryYellow};   
    font-size: 48px;
    text-align: center;
  }

  button {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 44px;
    vertical-align: middle;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: ${color.secondaryGray};
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;

    background-color: ${color.primaryYellow};
    transition: all 0.3s ease-in-out;
    
    &:hover {
        background-color: ${color.secondaryYellow};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }

    @media ${device.mobile} {
      font-size: 14px;
    }
  }
`;

export default GlobalStyle;
