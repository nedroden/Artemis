import React, { Component, ReactNode } from 'react';

import BoardIndex from './components/BoardIndex/BoardIndex';
import Heading from './elements/Heading';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Menu from './layout/Menu';

class App extends Component {
    public render(): ReactNode {
        return (
            <div>
                <Header forumTitle="Artemis demo forum" />
                <Menu />
                <div className="app-wrapper">
                    <div className="app">
                        <Heading text="Board index" />
                        <main>
                            <BoardIndex />
                        </main>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default App;
