import React from 'react';
import _ from 'lodash';

import * as ParticleLines from '@rodikh/particle-lines';
import { ParticleEngine } from '@rodikh/particles';

export default class CanvasSection extends React.Component {
    constructor (props) {
        super(props);
        this.canvasRef = React.createRef();
        this.drawQueue = [];
        this.interval = null;
        this.ctx = null;
    }

    componentDidMount() {
        const section = _.get(this.props, 'section');
        const demoType = section.demo_type;

        this.canvasRef.current.width = this.canvasRef.current.parentNode.clientWidth;
        this.canvasRef.current.height = 600;
        this.ctx = this.canvasRef.current.getContext('2d');

        let options = {};
        try {
            options = JSON.parse(section.options);
        } catch(e) {}

        if (this.demoTypes[demoType]) {
            this.demoTypes[demoType].up(canvas, options);
        }
        
        this.interval = setInterval(this.tick.bind(this), 1000 / this.fps);
    }

    demoTypes = {
        'particle-lines': {
            up: (options) => {
                const engine = new ParticleEngine(this.canvasRef.current, {color: '0,0,0', particleLines: true, particlesAmount: options.particle_count, maxLineDistance: 150});
                this.drawQueue.push(engine);
            },
            down: () => {}
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        this.ctx = null;
        this.drawQueue = [];
    }

    tick() {
        this.ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
        this.drawQueue.forEach(item => item.draw(this.ctx))
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
