import React from 'react';
import _ from 'lodash';

import { markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export default class ParticleLinesSection extends React.Component {
    constructor (props) {
        super(props);
        this.
    }
    componentDidMount() {

    }

    render() {
        const section = _.get(this.props, 'section');
        
        return (
            <div className="text-block container container--md">
                <canvas id={section.canvas_id} />
            </div>

        );
    }
}
