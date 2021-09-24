import { render, waitFor, fireEvent } from '@testing-library/svelte';
import App from '../App.svelte';

jest.mock('../../constants', () => ({
  COLORS: ['#212121']
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
    jest.spyOn(URLSearchParams.prototype, 'has').mockImplementationOnce(key => (key === 'limit' ? true : key));
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementationOnce(key => (key === 'limit' ? 42 : key));

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

  xit("Testing 'Mode' urlSearchParam + 'Click' Event", async () => {
    jest.spyOn(URLSearchParams.prototype, 'has').mockImplementationOnce(key => (key === 'mode' ? true : key));
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementationOnce(key => (key === 'mode' ? 'script' : key));

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
