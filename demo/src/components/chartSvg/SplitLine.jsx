import React, { PureComponent } from 'react';
import PropTypes, { node } from 'prop-types';
import { COLUMN_NUM, CHART_WIDTH } from '../../util/constant';
import { ROW_HEIGHT } from './util/constant';
import { transformDecorator } from 'rc-chart-slider';

@transformDecorator(CHART_WIDTH)
class SplitLine extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };
  /**
   * 得到竖线的坐标
   */
  getHorizontalLineXY = data => {
    const { columnWidth, nodes } = data;
    const topNodes = [];
    const bottomNodes = [];

    for (let i = 0; i < nodes.length + 1; i++) {
      topNodes.push([i * 100, 0]);
      bottomNodes.push([i * 100, COLUMN_NUM * 25]);// ROW_HEIGHT=5
    }
    const res = [];
    for (let i = 0; i < nodes.length + 1; i++) {
      res.push([topNodes[i], bottomNodes[i]]);
    }
    return res;
  };

  /**
   * 得到横线的坐标
   */
  getVerticalLineXY = data => {
    const { columnWidth, nodes } = data;
    const leftNodes = [];
    const rightNodes = [];
    const lineCount = COLUMN_NUM + 1;
    console.log(lineCount);
    for (let i = 0; i < lineCount; i++) {
      leftNodes.push([0, i * 25 + 24 + 12]); // 上偏移 + 字号
      rightNodes.push([400, i * 25 + 24 + 12]);
    }
    const res = [];
    for (let i = 0; i < lineCount; i++) {
      res.push([leftNodes[i], rightNodes[i]]);
    }
    return res;
  };

  render() {
    const { data, nodes, columnWidth } = this.props;
    const { showStartPercent } = data;
    const showIndex = showStartPercent * COLUMN_NUM;
    const horizontalLineXY = this.getHorizontalLineXY({
      columnWidth, nodes
    });
    const verticalLineXY = this.getVerticalLineXY({
      columnWidth, nodes
    });
    return (
      <g>
        {horizontalLineXY.map((line, index) => {
          if (index < showIndex) return null;
          return (
            <line key={index} x1={line[0][0]} y1={line[0][1]} x2={line[1][0]} y2={line[1][1]}
              strokeDasharray="5, 2" strokeWidth="1" strokeOpacity="0.1" stroke="black"
            />
          );
        })}
        {verticalLineXY.map((line, index) => {
          return (
            <line key={index}
              x1={line[0][0]} y1={line[0][1]} x2={line[1][0]} y2={line[1][1]}
              strokeDasharray="5, 2" strokeWidth="1" strokeOpacity="0.1" stroke="black"
            />
          );
        })}
      </g>
    );
  }
}

export default SplitLine;
