import statusActionTypes from './statusActionTypes';
import loginActionTypes from './loginActionTypes';
import registerActionTypes from './registerActionTypes';
import postActionTypes from './postActionTypes';
import tokenActionTypes from './tokenActionTypes';
import settingsActionTypes from './settingsActionTypes';

export default {
  ...statusActionTypes,
  ...loginActionTypes,
  ...registerActionTypes,
  ...postActionTypes,
  ...tokenActionTypes,
  ...settingsActionTypes
};
