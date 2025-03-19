import '@testing-library/jest-dom';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

jest.mock('/../assets/darth-vader-icon.png', () => 'darth-vader-icon.png');
jest.mock('../../assets/sad-baby-yoda.jpg', () => 'sad-baby-yoda.jpg');
