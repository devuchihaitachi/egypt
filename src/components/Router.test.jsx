import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NavigationProvider, useNavigation } from './Router';

function TestComponent() {
  const { currentPage, navigateTo, transitionDirection } = useNavigation();
  return (
    <div>
      <span data-testid="current-page">{currentPage}</span>
      <span data-testid="direction">{transitionDirection}</span>
      <button onClick={() => navigateTo('pyramids')}>Go to Pyramids</button>
      <button onClick={() => navigateTo('home')}>Go to Home</button>
    </div>
  );
}

test('handles page transitions and directions correctly', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <NavigationProvider>
        <TestComponent />
      </NavigationProvider>
    </MemoryRouter>
  );

  expect(screen.getByTestId('current-page').textContent).toBe('home');

  // Navigate forward
  fireEvent.click(screen.getByText('Go to Pyramids'));
  expect(screen.getByTestId('current-page').textContent).toBe('pyramids');
  expect(screen.getByTestId('direction').textContent).toBe('forward');

  // Navigate backward
  fireEvent.click(screen.getByText('Go to Home'));
  expect(screen.getByTestId('current-page').textContent).toBe('home');
  expect(screen.getByTestId('direction').textContent).toBe('backward');
});
