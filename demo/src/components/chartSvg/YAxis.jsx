import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class YAxis extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { nodes } = this.props;
    return (
      <g>
        {nodes.map((node, index) => {
          // 左边距 36
          const x = 36 + 100 * index;
          return <text key={index} x={x} y="24" fill="#000" fillOpacity="0.45" fontSize="12">{node.yAxis}</text>
        })}
      </g>
    );
  }
}

export default YAxis;
