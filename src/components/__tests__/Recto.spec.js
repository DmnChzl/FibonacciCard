import { render } from '@testing-library/svelte';
import Recto from '../Recto.svelte';

describe('<Recto />', () => {
  it('Testing Snapshot', () => {
    const { container } = render(Recto);

    expect(container).toMatchSnapshot();
  });

  it("Testing 'Color' Prop", () => {
    const { container, queryByText, getByText } = render(Recto, { color: '#FAFAFA' });

    expect(queryByText('?')).toBeInTheDocument();

    const recto = container.querySelector('.recto');
    const text = getByText('?');

    expect(recto).toHaveStyle({ background: '#212121' });
    expect(text).toHaveStyle({ color: '#FAFAFA' });
  });
});
