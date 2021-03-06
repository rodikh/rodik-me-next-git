import React from 'react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';

import { withPrefix, classNames } from '../utils';
import Header from './Header';
import Footer from './Footer';
import * as ParticleLines from '@rodikh/particle-lines'

export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.handleVideoEmbeds = this.handleVideoEmbeds.bind(this);
        this.particlesRef = React.createRef();
    }

    componentDidMount() {
        this.handleVideoEmbeds();
        
        this.particlesRef.current.width = window.innerWidth;
        this.particlesRef.current.height = window.innerHeight;
        new ParticleLines(this.particlesRef.current, {particlesAmount: (window.innerWidth * window.innerHeight) / (120 * 120), maxDistance: 150, maxVelocity: 0.6, fps: 50});
    }

    componentDidUpdate() {
        this.handleVideoEmbeds();
    }

    handleVideoEmbeds() {
        const videoEmbeds = ['iframe[src*="youtube.com"]', 'iframe[src*="vimeo.com"]'];
        noframe(videoEmbeds.join(','), '.container-md');
    }

    render() {
        const page = _.get(this.props, 'page');
        const pageTitle = _.get(page, 'title');
        const config = _.get(this.props, 'config');
        const configTitle = _.get(config, 'title');
        const font = _.get(config, 'base_font', 'fraunces');
        const colorScheme = _.get(config, 'color_scheme', 'light');
        const accentColor = _.get(config, 'accent_color', 'pink');
        const favicon = _.get(config, 'favicon');
        const domain = _.trim(_.get(config, 'domain', ''), '/');
        const seo = _.get(page, 'seo');
        const seoTitle = _.get(seo, 'title');
        const title = seoTitle ? seoTitle : [pageTitle, configTitle].join(' | ');
        const seoDescription = _.get(seo, 'description', '');
        const seoRobots = _.get(seo, 'robots', []).join(',');
        const seoExtra = _.get(seo, 'extra', []).map((meta, index) => {
            const keyName = _.get(meta, 'keyName', 'name');
            const name = _.get(meta, 'name');
            if (!name) {
                return null;
            }
            const nameAttr = { [keyName]: name };
            const relativeUrl = _.get(meta, 'relativeUrl');
            let value = _.get(meta, 'value');
            if (!value) {
                return null;
            }
            if (relativeUrl) {
                if (!domain) {
                    return null;
                }
                value = domain + withPrefix(value);
            }
            return <meta key={index} {...nameAttr} content={value} />;
        });

        return (
            <React.Fragment>
                <Helmet>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="google" content="notranslate" />
                    <meta name="description" content={seoDescription} />
                    {seoRobots && <meta name="robots" content={seoRobots} />}
                    {seoExtra}
                    {font !== 'system-sans' && <link rel="preconnect" href="https://fonts.gstatic.com" />}
                    {font === 'fraunces' && <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />}
                    {font === 'karla' && <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />}
                    {favicon && <link rel="icon" href={withPrefix(favicon)} />}
                    <body className={classNames(`font-${font}`, `palette-${colorScheme}`, `accent-${accentColor}`)} />
                </Helmet>
                <div id="site-wrap" className="site">
                    <canvas id="particles" ref={this.particlesRef} />
                    <Header page={page} config={config} />
                    <main id="content" className="site-content">
                        {this.props.children}
                    </main>
                    <Footer config={config} />
                </div>
            </React.Fragment>
        );
    }
}
