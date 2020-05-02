import React, { Component, ReactNode } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

class Spinner extends Component {
    public render(): ReactNode {
        return (
            <div className="spinner-container">
                <PulseLoader size={13} color={'steelblue'} />
            </div>
        );
    }
}

export default Spinner;
