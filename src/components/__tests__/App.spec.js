import { render, waitFor, fireEvent } from '@testing-library/svelte';
import App from '../App.svelte';

jest.mock('../../constants', () => ({
  COLORS: ['#212121']
}));

jest.mock('../../scripts.json', () => ({
  en: {
    0: ['in fact...', "it's already done!"]
  }
}));

describe('<App />', () => {
  beforeEach(() => {
    jest.spyOn(document, 'querySelector').mockImplementation(() => ({
      setAttribute: jest.fn()
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testing Snapshot', () => {
    const { container } = render(App);

    expect(container).toMatchSnapshot();
  });

  it("Testing 'MaxLength' Prop", async () => {
    const { queryByText } = render(App, { maxLength: 12 });

    expect(queryByText('89')).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByText('?')).toBeInTheDocument();
    });
  });

  it("Testing 'Limit' urlSearchParam", () => {
    const location = {
      ...window.location,
      search: '?limit=42'
    };

    Object.defineProperty(window, 'location', {
      writable: true,
      value: location
    });

    const { queryByText } = render(App, { maxLength: 12 });

    expect(queryByText('34')).toBeInTheDocument();
  });

  it("Testing 'Click' Event", async () => {
    const { container, queryByText } = render(App, { maxLength: 1 });

    expect(queryByText('0')).toBeInTheDocument();

    const button = container.querySelector('button');

    await waitFor(() => {
      expect(queryByText('?')).toBeInTheDocument();
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(queryByText('0')).toBeInTheDocument();
    });
  });

  it("Testing 'Mode' urlSearchParam + 'Click' Event", async () => {
    const location = {
      ...window.location,
      search: '?mode=script'
    };

    Object.defineProperty(window, 'location', {
      writable: true,
      value: location
    });

    const { container, queryByText } = render(App, { maxLength: 1 });

    expect(queryByText('0')).toBeInTheDocument();

    const button = container.querySelector('button');

    await waitFor(() => {
      expect(queryByText('?')).toBeInTheDocument();
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(queryByText('in fact...')).toBeInTheDocument();
      expect(queryByText("it's already done!")).toBeInTheDocument();
    });
  });
});
