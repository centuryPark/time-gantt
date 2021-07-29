import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { COLUMN_NUM } from '../../../util/constant';
import { ROW_HEIGHT } from '../util/constant';
import Value from './components/value.jsx';
import Average from './components/average.jsx';
import Error from './components/error.jsx';
import WaitTime from './components/waitTime.jsx';
import NodeName from './components/nodeName.jsx';

const NODE_VALUE_END_X = [];

class Node extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { node, nodeIndex, showDate, columnWidth, showStartPercent, showPercent } = this.props;
    let startX = 0;
    // 大于 showDate = 2018-04-01 00:00
    if (moment(node.value.startTime).valueOf() > moment(showDate).valueOf()) {
      const startMillToDay = moment(node.value.startTime).valueOf() - moment(showDate).valueOf();
      const startHourPercent =  startMillToDay / 1000 / 60 / 60 / 24;
      startX = (startHourPercent * 20 * COLUMN_NUM).toFixed(2);
    }
    const startY = nodeIndex * ROW_HEIGHT;

    const start_x = nodeIndex * 100;

    const nextProps = {
      startX,
      start_x,
      startY,
      node,
      data: {
        showPercent,
        showStartPercent,
      },
      columnWidth,
      showDate,
      NODE_VALUE_END_X,
    };

    // 名字使用自己的transform
    return (
      <g>
        {/* <WaitTime {...nextProps} /> */}
        <Value {...nextProps} />
        <Average {...nextProps} />
        <Error {...nextProps} />
        <NodeName {...nextProps} />
      </g>
    );
  }
}

export default Node;
