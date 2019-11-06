import * as React from "react";
import { Helmet } from "react-helmet"
export interface metaProps {title:string; keywords: string; desc: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
 class Meta extends React.Component<metaProps, {}> {
    
    render() {
        return  <Helmet>
            <title>{this.props.title}</title>
            <meta name="keywords" content={this.props.keywords} />
            <meta name="description" content={this.props.desc} />
            {this.props.children}
        </Helmet>
    }
}

export default Meta