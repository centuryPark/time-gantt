import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CHART_WIDTH, COLUMN_NUM } from '../../util/constant';
import { XAXIS_ARR, OVER_SIZE_HIDDEN } from './util/constant';

const startIndex = [65, 36];
const endIndex = [65, 48 * 25];

class XAxisSvg extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  /**
   * 画辅助线
   */
  renderLine = () => {
    const { columnWidth, data } = this.props;
    const { showPercent, showStartPercent } = data;
    const showIndex = showStartPercent * COLUMN_NUM;
    return (
      <svg>
        <line x1={startIndex[0]} y1={startIndex[1]} x2={endIndex[0]} y2={endIndex[1]}
          strokeWidth="1" strokeOpacity="0.4" stroke="black" />
        {
          XAXIS_ARR.map((axis, index) => {
            if (index >= showIndex && index <= ((showPercent * COLUMN_NUM) + showIndex)) {
              return (
                <line
                  key={index}
                  x1={startIndex[0]}
                  y1={startIndex[1] + 25 * ((index - showIndex))}
                  x2={startIndex[0] - 5}
                  y2={startIndex[1] + 25 * ((index - showIndex))}
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  stroke="black"
                />
              );
            }
            return null;
          })
        }
      </svg>
    );
  };

  /**
   * 渲染X轴的数据
   */
  renderXAxis = () => {
    const { columnWidth, data } = this.props;
    const { showPercent, showStartPercent } = data;
    const showIndex = showStartPercent * COLUMN_NUM;
    return (
      <svg>
        {
          XAXIS_ARR.map((axis, index) => {
            if ((showPercent * COLUMN_NUM) > OVER_SIZE_HIDDEN && index % 2) return null;
            if (index >= showIndex && index <= ((showPercent + showStartPercent) * COLUMN_NUM)) {
              return (
                <text
                  x={startIndex[0] - 10}
                  y={startIndex[1] + 25 * index}
                  textAnchor="end"
                  fill="#000"
                  fillOpacity="0.45"
                  fontSize="12"
                  key={index}
                  transform={`translate(0, 4)`}
                >
                  {axis}
                </text>
              );
            }
            return null;
          })
        }
      </svg>
    );
  };

  render() {
    const { svgWith } = this.props;
    return (
      <div className="g-xAxis">
        <svg
          version="1.1"
          baseProfile="full"
          // width={svgWith + 146}
          height={48 * 25}
          xmlns="http://www.w3.org/2000/svg"
        >
          {this.renderLine()}
          {this.renderXAxis()}
        </svg>
      </div>
    );
  }
}

export default XAxisSvg;
