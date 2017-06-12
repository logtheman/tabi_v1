import ReactOnRails from 'react-on-rails';
import MainPage from '../components/draft_components/MainPage';
import HelloWorld from '../components/HelloWorld';
import Index from '../components/draft_components/index';


// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  MainPage,
  Index
});
