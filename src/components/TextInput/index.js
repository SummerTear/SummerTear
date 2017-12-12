import { h, Component } from 'preact';
import styles from './style';

class TextInput extends Component {
  focus = () => this._input.focus();

  render({ className, ...rest }) {
    return (
      <input
        {...rest}
        class={[styles.input, rest.class, className].filter(Boolean).join(' ')}
        ref={c => (this._input = c)}
      />
    );
  }
}

export default TextInput;
