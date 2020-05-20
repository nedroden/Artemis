import React, { ReactNode } from 'react';

import Spinner from '../Components/Elements/Spinner';

export default function conditionalSpinnerRenderer(shouldDisplay: boolean): ReactNode {
    return shouldDisplay ? <Spinner /> : null;
}
