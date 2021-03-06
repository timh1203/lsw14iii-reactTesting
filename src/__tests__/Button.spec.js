import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from '../components/Button/Button';

let wrapper, mountedButton;

describe('<Button />', () => {
  beforeAll(() => {
    wrapper = (shallow(<Button />))
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
  });
  it('should match snapshot', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  })
  it('should shallow render without crashing', () => {
    wrapper;
  })
  it('should have a div with a className of "component-button"', () => {
    expect(wrapper.find('div').hasClass('component-button')).toBe(true);
  })
  it('should have a button component', () => {
    expect(wrapper.find('div.button')).tobeTruthy;
  })
  it('should check it button component exists', () => {
    expect(wrapper.find('div').exists('button')).tobeTruthy;
  })

  beforeEach(() => {
    mountedButton = mount(<Button />);
    mountedButton.setProps({ name: undefined, clickHandler: jest.fn() });

    it('should handle user click', () => {
      mountedButton.find('button').simulate('click')
      expect(props.clickHandler).toHaveBeenCalled()
    })
  })

  describe('<Button /> props.orange', () => {
    beforeEach(() => {
      mountedButton = mount(<Button />);
      mountedButton.setProps({ orange: true });
      it('should have classname of "component-button orange" if true', () => {
        expect(mountedButton.find('div').hasClass('component-button orange')).toBeTruthy()
      })
    })

    beforeEach(() => {
      mountedButton = mount(<Button />);
      mountedButton.setProps({ orange: false });
      it('should have classname of "component-button " if false', () => {
        // Notice the empty space due to false return: SEE Button.js (20)
        expect(mountedButton.find('div').hasClass('component-button ')).toBeFalsy()
      })
    })
  })

  describe('<Button /> props.wide', () => {
    beforeEach(() => {
      mountedButton = mount(<Button />);
      mountedButton.setProps({ wide: true });
      it('should have classname of "component-button wide" if true', () => {
        // two spaces because this.props.orange returned ' ' from default of false: SEE Button.js (20, 21)
        expect(mountedButton.find('div').hasClass('component-button  wide')).toBeTruthy()
      })
    })

    beforeEach(() => {
      mountedButton = mount(<Button />);
      mountedButton.setProps({ wide: false });
      it('should have classname of "component-button  " if false', () => {
        // two spaces because this.props.orange returned ' ' from default of false: SEE Button.js (20, 21)
        expect(mountedButton.find('div').hasClass('component-button  ')).toBeTruthy()
      })
    })
  })
});
