import { render, screen } from '@testing-library/svelte';
import Verso from '../Verso.svelte';

describe('<Verso />', () => {
  it('Testing Snapshot', () => {
    const { container } = render(Verso);

    expect(container).toMatchSnapshot();
  });

  it("Testing 'Value' Prop", () => {
    const { container, queryByText } = render(Verso, { value: 42 });

    expect(queryByText('42')).toBeInTheDocument();
  });

  it("Testing 'Color' Prop", () => {
    const { container, getByText } = render(Verso, { value: 42, color: '#FAFAFA' });

    const verso = container.querySelector('.verso');
    const text = getByText('42');

    expect(verso).toHaveStyle({ background: '#212121' });
    expect(text).toHaveStyle({ color: '#FAFAFA' });
  });
});
