import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CartCountComponent from '../components/CartCount';

const wrapper = shallow(<CartCountComponent count={10} />);

describe('<CartCount/>', () => {
    it('renders', () => {
        expect(wrapper);
    });

    it('matches the snapshot', () => {
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    it('updates via props', () => {
        expect(toJSON(wrapper)).toMatchSnapshot();
        wrapper.setProps({ count: 50 });
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});