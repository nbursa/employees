jest.mock('../../__mocks__/config');

import {render} from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary.tsx';

const Bomb = () => {
  throw new Error('Boom');
};


let logSpy: jest.SpyInstance;

beforeAll(() => {
  logSpy = jest.spyOn(console, 'log').mockImplementation(() => {
  });
});

afterAll(() => {
  if (logSpy && logSpy.mockRestore) {
    logSpy.mockRestore();
  }
});

describe('ErrorBoundary', () => {
  let mockConsoleError: jest.SpyInstance;

  // Suppress console errors in Jest output. You might want to see these in debugging, though.
  beforeAll(() => {
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {
    });
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  it('catches error and displays message', () => {
    const {container} = render(
      <ErrorBoundary>
        <Bomb/>
      </ErrorBoundary>
    );

    // Expect the error message to be in the document
    expect(container.textContent).toContain('Something went wrong');
    // The error boundary's componentDidCatch should log the error
    expect(console.error).toHaveBeenCalled();
  });

  it('displays child content when no error is thrown', () => {
    const {container} = render(
      <ErrorBoundary>
        <div>Everything is fine</div>
      </ErrorBoundary>
    );

    expect(container.textContent).toContain('Everything is fine');
  });
});