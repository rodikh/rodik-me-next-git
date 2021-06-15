import React from 'react';
import _ from 'lodash';

import { markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export default class ParticleLinesSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        
        return (
            <div className="text-block container container--md">
                {markdownify(content)}
            </div>

        );
    }
}
