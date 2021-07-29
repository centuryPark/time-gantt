import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { COLUMN_NUM, CHART_WIDTH } from '../../../../util/constant';
import { NODE_ATTRIBUTE } from '../../util/constant';
import { transformDecorator } from 'rc-chart-slider';

/**
 * 渲染错误点
 */
@transformDecorator(CHART_WIDTH)
class Error extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { showDate, columnWidth, node, startY, start_x } = this.props;
    return (
      <g>
        {
          node.highlightPoints.map((point, pointIndex) => {
            const startMillToDay = moment(point.time).valueOf() - moment(showDate).valueOf();
            const startHourPercent =  startMillToDay / 1000 / 60 / 60 / 24;
            const startX = (startHourPercent * columnWidth * COLUMN_NUM).toFixed(2);
            return (
              <circle
                key={pointIndex}
                cy={startX * 1 + 30}
                cx={start_x * 1 + 5}
                r="4"
                stroke="#F5222D"
                strokeWidth="1"
                fill="#fff"
              />
            );
          })
        }
      </g>
    );
  }
}

export default Error;
