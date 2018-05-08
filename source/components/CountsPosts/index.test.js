import dom from 'react-test-renderer';
import Counter from './';

const renderTree = dom.create(<Counter countsPosts = { 3 } />).toJSON();

test('Counter should correspound to its snapshot counterpart', () => {
    expect(renderTree).toMatchSnapshot();
});
