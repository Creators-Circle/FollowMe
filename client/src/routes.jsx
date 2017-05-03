// file for creating routes for specific components
import { Route, browserHistory, Redirect } from 'react-router';
import App from './components/App.jsx';
import AudienceView from './components/Audience/AudienceView';
import GuestView from './components/GuestView';
import PresenterView from './components/Presenter/PresenterView';
import PresenterViewContainer from './components/Presenter/PresenterViewContainer';
import SummaryView from './components/Summary/SummaryView';
import TutorialPres from './components/TutorialPres';

const routes = (
  <Route>
    <Route path='/' component={App} />
    <Route path='/presenter' component={PresenterViewContainer} />
    <Route path='/summary/tutorial' component={TutorialPres} />
    <Route path='/summary/:lectureId' component={SummaryView} />
    <Route path='/audience' component={AudienceView} />
    <Route path='/guest' component={GuestView} />
  </Route>
);

export default routes;
