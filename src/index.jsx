import { createRoot } from 'react-dom/client';
import Container from "react-bootstrap/Container";
import MainView from './components/main-view/main-view';

//import "bootstrap/dist/css/bootstrap.min.css"; //needs to be before scss import
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return (
        <Container>
            <MainView />
        </Container>
    );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render the app in the root DOM element
root.render(
    <MyFlixApplication />);