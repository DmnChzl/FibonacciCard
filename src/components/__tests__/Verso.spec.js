import { render, screen } from '@testing-library/svelte';
import Verso from '../Verso.svelte';

jest.mock('../../scripts.json', () => ({
  en: {
    0: ['in fact...', "it's already done!"]
  }
}));

describe('<Verso />', () => {
  it('Testing Snapshot', () => {
    const { container } = render(Verso, { value: 0, opacity: 0, mode: 'standard' });

    expect(container).toMatchSnapshot();
  });

  it("Testing 'Value' Prop", () => {
    const { queryByText } = render(Verso, { value: 42, opacity: 0, mode: 'standard' });

    expect(queryByText('42')).toBeInTheDocument();
  });

  it("Testing 'Opacity' & 'Mode' Props", () => {
    const { queryByText } = render(Verso, { value: 0, opacity: 1, mode: 'script' });

    expect(queryByText('in fact...')).toBeInTheDocument();
    expect(queryByText("it's already done!")).toBeInTheDocument();
  });

  it("Testing 'Color' Prop", () => {
    const { container, getByText } = render(Verso, { value: 42, opacity: 0, mode: 'standard', color: '#FAFAFA' });

    const verso = container.querySelector('.verso');
    const text = getByText('42');

    expect(verso).toHaveStyle({ background: '#212121' });
    expect(text).toHaveStyle({ color: '#FAFAFA' });
  });
});
