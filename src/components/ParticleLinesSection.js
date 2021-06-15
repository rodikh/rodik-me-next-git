import React from 'react';
import _ from 'lodash';

import * as ParticleLines from '@rodikh/particle-lines';

export default class ParticleLinesSection extends React.Component {
    constructor (props) {
        super(props);
        this.canvasRef = React.createRef();
    }
    componentDidMount() {
        const section = _.get(this.props, 'section');

        this.canvasRef.current.width = this.canvasRef.current.parentNode.clientWidth;
        this.canvasRef.current.height = 600;
        new ParticleLines(this.canvasRef.current, {particlesAmount: sections.options.particle_count, maxDistance: 150});
    }

    render() {
        const section = _.get(this.props, 'section');
        
        return (
            <div className="text-block container container--md">
                <canvas id={section.canvas_id} ref={this.canvasRef} />
            </div>

        );
    }
}
