import React from 'react';
import _ from 'lodash';

import { markdownify } from '../utils';
import CtaButtons from './CtaButtons';
import * as ParticleLines from '@rodikh/particle-lines';

export default class ParticleLinesSection extends React.Component {
    constructor (props) {
        super(props);
        this.canvasRef = React.createRef();
    }
    componentDidMount() {
        
        new ParticleLines(this.canvasRef.current, {particlesAmount: 100, maxDistance: 150});
    }

    render() {
        const section = _.get(this.props, 'section');
        
        return (
            <div className="text-block container container--md">
                <canvas id={section.canvas_id} ref={canvasRef} />
            </div>

        );
    }
}
