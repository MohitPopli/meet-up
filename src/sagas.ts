import meetingConfirmationSagas from './containers/MeetingConfirmation/store/sagas';
import homeSagas from './containers/Home/store/sagas';

// eslint-disable-next-line
export default [...homeSagas, ...meetingConfirmationSagas];
