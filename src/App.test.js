import { render } from '@testing-library/react';
import App from './App';

// 🔥 Mock entire DonorList component (IMPORTANT)
jest.mock('./components/DonorList', () => () => <div>Mocked DonorList</div>);

test('renders app without crashing', () => {
  render(<App />);
});