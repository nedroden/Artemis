import React, { Component, ReactNode } from 'react';

class Footer extends Component {
    public render(): ReactNode {
        return (
            <div id="footer">
                Powered by{' '}
                <a href="https://robertmonden.com/artemis" target="_blank" rel="noopener noreferrer">
                    Artemis
                </a>{' '}
                | &copy; {new Date().getFullYear()} Robert Monden
            </div>
        );
    }
}

export default Footer;
