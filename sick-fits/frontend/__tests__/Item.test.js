import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const mockItem = {
    id: 'abc123',
    title: 'My mock item',
    price: 5000,
    description: 'Helps me make sure the app works',
    image: 'picture.jpg',
    largeImage: 'biggerPicture.jpg',
};

const wrapper = shallow(<ItemComponent item={mockItem} />);

describe('<Item/>', () => {
    // Snapshot test
    it('renders and matches the snapshot', () => {
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    // More traditional tests
    it('renders and displays price properly', () => {
        const PriceTag = wrapper.find('PriceTag');
        // console.log(PriceTag.debug())
        // console.log(PriceTag.dive().text())
        expect(PriceTag.children().text()).toBe('$50');
    });

    it('renders and displays image properly', () => {
        const img = wrapper.find('img');
        expect(img.props().src).toBe(mockItem.image);
        expect(img.props().alt).toBe(mockItem.title);
    });

    it('renders and displays the title properly', () => {
        expect(wrapper.find('Title a').text()).toBe(mockItem.title);
    });

    it('renders all buttons properly', () => {
        const buttonList = wrapper.find('.buttonList');
        expect(buttonList.children()).toHaveLength(3);
        // All of these tests do the same thing
        expect(buttonList.find('Link')).toHaveLength(1);
        expect(buttonList.find('AddToCart').exists()).toBe(true);
        expect(buttonList.find('DeleteItem')).toBeTruthy();
    });
})