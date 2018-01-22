import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { route } from 'utils';
import userState from 'constants/userState';
import Card from 'components/Card';
import { loginSuccess, setToken } from 'actions';
import styles from './style';
import api from 'api';

class ConfirmPage extends Component {
  componentWillMount() {
    //如果有data(confirm/:data),则表示从邮箱请求验证
    if (this.props.match.params.data) {
      this.setState({ confirm: true });
    } else if (
      !this.props.token.raw ||
      this.props.token.obj.state === userState.ACTIVE ||
      this.props.token.obj.state === userState.ACTIVE_LOCK
    ) {
      route('/login', true);
    }
  }
  componentDidMount() {
    // TODO 转移到logic里
    if (this.state.confirm) {
      api['confirm']
        .confirm(this.props.match.params.data)
        .then(({ token }) => {
          this.props.setToken(token);
          this.props.loginSuccess();
          route('/', true);
        })
        .catch(err => {
          //TODO 验证失败处理
          console.log(err);
          route('/login', true);
        });
    }
  }

  render({ token }, { confirm }) {
    return (
      <Card class={styles.confirm}>
        {confirm ? (
          <div>正在验证。。。</div>
        ) : (
          [
            <div class={styles.greeting}>你好：{token.obj.nickname}</div>,
            <div class={styles.description}>
              验证邮件已发送到<strong>{token.obj.email}</strong>
            </div>
          ]
        )}
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return { token: state.token };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginSuccess, setToken }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPage);
