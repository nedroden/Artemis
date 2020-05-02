import React, { ReactNode } from 'react';

import Spinner from '../elements/Spinner';

export default function conditionalSpinnerRenderer(shouldDisplay: boolean): ReactNode {
    return shouldDisplay ? <Spinner /> : null;
}
