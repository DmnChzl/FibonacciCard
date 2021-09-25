import { render, screen } from '@testing-library/svelte';
import Verso from '../Verso.svelte';

jest.mock('../../scripts.json', () => ({
  en: {
    0: ['in fact...', "it's already done!"],
    5: [
      ['5 or 8', "it's all the same"],
      ["it's all the same", '5 or 8']
    ]
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

  it("Testing 'Opacity' & 'Mode' Props (Catch)", () => {
    const { queryByText } = render(Verso, { value: 3, opacity: 1, mode: 'script' });

    expect(queryByText('because...')).not.toBeInTheDocument();
    expect(queryByText('why not?')).not.toBeInTheDocument();
  });

  it("Testing 'Opacity' & 'Mode' Props (Multiple)", () => {
    const { queryByText } = render(Verso, { value: 5, opacity: 1, mode: 'script' });

    expect(queryByText('5 or 8')).toBeInTheDocument();
    expect(queryByText("it's all the same")).toBeInTheDocument();
  });

  it("Testing 'Color' Prop", () => {
    const { container, getByText } = render(Verso, { value: 42, opacity: 0, mode: 'standard', color: '#FAFAFA' });

    const verso = container.querySelector('.verso');
    const text = getByText('42');

    expect(verso).toHaveStyle({ background: '#212121' });
    expect(text).toHaveStyle({ color: '#FAFAFA' });
  });
});
