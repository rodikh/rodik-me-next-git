import React from 'react';
import _ from 'lodash';

import * as ParticleLines from '@rodikh/particle-lines';
import { ParticleEngine } from '@rodikh/particles';

export default class ParticleLinesSection extends React.Component {
    constructor (props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        const section = _.get(this.props, 'section');

        this.canvasRef.current.width = this.canvasRef.current.parentNode.clientWidth;
        this.canvasRef.current.height = 600;
        const engine = new ParticleEngine(this.canvasRef.current, {color: '0,0,0', particleLines: true, particlesAmount: section.options.particle_count, maxLineDistance: 150});

        // new ParticleLines(this.canvasRef.current, {particlesAmount: section.options.particle_count, maxDistance: 150});

    }

    render() {
        const section = _.get(this.props, 'section');
        
        return (
            <div className="embed-block container container--md">
                <div className="canvas-wrapper">
                    <canvas id={section.canvas_id} ref={this.canvasRef} />
                </div>
            </div>

        );
    }
}
