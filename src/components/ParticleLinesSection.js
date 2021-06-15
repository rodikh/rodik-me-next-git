import React from 'react';
import _ from 'lodash';

import { markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export default class ParticleLinesSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        
        return (
            <section id={sectionId} className="particle-lines">
                <div className="container container--lg">
                    {title && <h1 className="hero__title">{title}</h1>}
                    {content && (
                        <div className="hero__body text-block">
                            {markdownify(content)}
                        </div>
                    )}
                    {!_.isEmpty(actions) && (
                        <div className="hero__actions button-group">
                            <CtaButtons actions={actions} />
                        </div>
                    )}
                </div>
            </section>
        );
    }
}
