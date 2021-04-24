import homeSagas from './containers/Home/store/sagas';
import modeSagas from './containers/ModesContainer/store/sagas';

// eslint-disable-next-line
export default [...homeSagas, ...modeSagas];
