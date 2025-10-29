import React from "react";
import { BarStack } from "@visx/shape";
import { SeriesPoint } from "@visx/shape/lib/types";
import { Group } from "@visx/group";
// import { Grid } from "@visx/grid";
import { AxisBottom, AxisLeft } from "@visx/axis";
// Mock data for stacked categories
const cityTemperature = [
  { date: "2020-01-01", Critical: 9, Complain: 17, Confused: 17, Misc: 4 },
  { date: "2020-01-02", Critical: 8, Complain: 18, Confused: 17, Misc: 3 },
  { date: "2020-01-03", Critical: 10, Complain: 18, Confused: 16, Misc: 5 },
  { date: "2020-01-04", Critical: 9, Complain: 18, Confused: 16, Misc: 4 },
  { date: "2020-01-05", Critical: 11, Complain: 19, Confused: 17, Misc: 4 },
  { date: "2020-01-06", Critical: 10, Complain: 18, Confused: 16, Misc: 3 },
  { date: "2020-01-07", Critical: 10, Complain: 18, Confused: 17, Misc: 4 },
  { date: "2020-01-08", Critical: 9, Complain: 17, Confused: 16, Misc: 3 },
  { date: "2020-01-09", Critical: 11, Complain: 19, Confused: 17, Misc: 5 },
  { date: "2020-01-10", Critical: 9, Complain: 18, Confused: 16, Misc: 3 },
  { date: "2020-01-11", Critical: 10, Complain: 19, Confused: 17, Misc: 4 },
  { date: "2020-01-12", Critical: 9, Complain: 18, Confused: 16, Misc: 3 },
  { date: "2020-01-13", Critical: 10, Complain: 18, Confused: 17, Misc: 4 },
  { date: "2020-01-14", Critical: 10, Complain: 18, Confused: 16, Misc: 4 },
  { date: "2020-01-15", Critical: 9, Complain: 18, Confused: 16, Misc: 3 },
  { date: "2020-01-16", Critical: 9, Complain: 17, Confused: 16, Misc: 3 },
  { date: "2020-01-17", Critical: 9, Complain: 17, Confused: 15, Misc: 3 },
  { date: "2020-01-18", Critical: 9, Complain: 17, Confused: 16, Misc: 3 },
  { date: "2020-01-19", Critical: 10, Complain: 18, Confused: 17, Misc: 4 },
  { date: "2020-01-20", Critical: 10, Complain: 18, Confused: 17, Misc: 4 },
  { date: "2020-01-21", Critical: 11, Complain: 19, Confused: 17, Misc: 5 },
  { date: "2020-01-22", Critical: 11, Complain: 19, Confused: 18, Misc: 5 },
  { date: "2020-01-23", Critical: 10, Complain: 19, Confused: 17, Misc: 4 },
  { date: "2020-01-24", Critical: 10, Complain: 18, Confused: 17, Misc: 3 },
  { date: "2020-01-25", Critical: 9, Complain: 18, Confused: 16, Misc: 3 },
  { date: "2020-01-26", Critical: 9, Complain: 18, Confused: 16, Misc: 3 },
  { date: "2020-01-27", Critical: 9, Complain: 17, Confused: 16, Misc: 3 },
  { date: "2020-01-28", Critical: 10, Complain: 17, Confused: 15, Misc: 3 },
  { date: "2020-01-29", Critical: 10, Complain: 18, Confused: 16, Misc: 3 },
  { date: "2020-01-30", Critical: 11, Complain: 18, Confused: 16, Misc: 4 },
  { date: "2020-01-31", Critical: 11, Complain: 18, Confused: 17, Misc: 4 },
];

type CityTemperature = {
  date: string;
  Critical: number;
  Complain: number;
  Confused: number;
  Misc: number;
};
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { timeParse, timeFormat } from "@visx/vendor/d3-time-format";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { LegendOrdinal } from "@visx/legend";
import { localPoint } from "@visx/event";

type CityName = "Critical" | "Complain" | "Confused" | "Misc";

type TooltipData = {
  bar: SeriesPoint<CityTemperature>;
  key: CityName;
  index: number;
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
};

export type BarStackProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
};

const purple1 = "#6c5efb";
const purple2 = "#c998ff";
export const purple3 = "#a44afe";
const purple4 = "#ff8c00";
export const background = "#eaedff";
const defaultMargin = { top: 40, right: 0, bottom: 0, left: 40 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};

const data = cityTemperature;
const keys = Object.keys(data[0]).filter((d) => d !== "date") as CityName[];

const temperatureTotals = data.reduce((allTotals, currentDate) => {
  const totalTemperature = keys.reduce((dailyTotal, k) => {
    dailyTotal += Number(currentDate[k]);
    return dailyTotal;
  }, 0);
  allTotals.push(totalTemperature);
  return allTotals;
}, [] as number[]);

const parseDate = timeParse("%Y-%m-%d");
const format = timeFormat("%b %d");
const formatDate = (date: string) => format(parseDate(date) as Date);

// accessors
const getDate = (d: CityTemperature) => d.date;

// scales
const dateScale = scaleBand<string>({
  domain: data.map(getDate),
  padding: 0.2,
});
const temperatureScale = scaleLinear<number>({
  domain: [0, Math.max(...temperatureTotals)],
  nice: true,
});
const colorScale = scaleOrdinal<CityName, string>({
  domain: keys,
  range: [purple1, purple2, purple3, purple4],
});

let tooltipTimeout: number;

export default function Example({
  width,
  height,
  events = false,
  margin = defaultMargin,
}: BarStackProps) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  });

  if (width < 10) return null;
  // bounds
  const xMax = width - margin.left;
  //   const yMax = height - margin.top - 100;
  const yMax = 100;

  dateScale.rangeRound([0, xMax]);
  temperatureScale.range([yMax, 0]);

  return width < 10 ? null : (
    <div style={{ position: "relative" }}>
      <svg ref={containerRef} width={width} height={height}>
        {/* <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={background}
          rx={14}
        /> */}
        <Group top={margin.top} left={margin.left}>
          <BarStack<CityTemperature, CityName>
            data={data}
            keys={keys}
            x={getDate}
            xScale={dateScale}
            yScale={temperatureScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => {
                  // 1. 전체 막대(Column)에서 가장 위에 있는 막대인지 확인
                  // bar.index는 데이터 키(key)의 인덱스입니다.
                  // barStacks.length - 1은 일반적으로 가장 위의 막대를 의미하지만,
                  // Stacked Bar의 정렬 방식(keys 배열의 순서)에 따라 달라질 수 있습니다.
                  const isTopBar = barStack.index === barStacks.length - 1;
                  const isBottomBar = barStack.index === 0;

                  // 2. SVG <rect> 대신 커스텀 요소 사용
                  // BarRounded를 사용할 수도 있지만, 가장 단순하게 <rect>의 rx/ry 사용

                  // 막대 전체의 둥근 모서리 (바닥도 포함)를 원하면 아래 속성을 전체에 적용합니다.
                  // 일반적으로는 상단만 둥글게 처리합니다.
                  const borderRadius = 6;

                  // 둥근 모서리를 위한 path 생성 함수
                  const createRoundedRectPath = (
                    x: number,
                    y: number,
                    width: number,
                    height: number,
                    radius: number,
                    topRounded: boolean,
                    bottomRounded: boolean
                  ) => {
                    const topLeft = topRounded
                      ? `M ${x + radius} ${y}`
                      : `M ${x} ${y}`;
                    const topRight = topRounded
                      ? `L ${x + width - radius} ${y} Q ${x + width} ${y} ${
                          x + width
                        } ${y + radius}`
                      : `L ${x + width} ${y}`;
                    const bottomRight = bottomRounded
                      ? `L ${x + width} ${y + height - radius} Q ${x + width} ${
                          y + height
                        } ${x + width - radius} ${y + height}`
                      : `L ${x + width} ${y + height}`;
                    const bottomLeft = bottomRounded
                      ? `L ${x + radius} ${y + height} Q ${x} ${
                          y + height
                        } ${x} ${y + height - radius}`
                      : `L ${x} ${y + height}`;
                    const topLeftClose = topRounded
                      ? `L ${x} ${y + radius} Q ${x} ${y} ${x + radius} ${y}`
                      : `L ${x} ${y}`;

                    return `${topLeft} ${topRight} ${bottomRight} ${bottomLeft} ${topLeftClose} Z`;
                  };

                  // 막대 그룹(Column)의 맨 위에 있는 막대인 경우
                  if (isTopBar) {
                    return (
                      <path
                        key={`bar-stack-${barStack.index}-${bar.index}`}
                        d={createRoundedRectPath(
                          bar.x,
                          bar.y,
                          bar.width,
                          bar.height,
                          borderRadius,
                          true,
                          false
                        )}
                        fill={bar.color}
                        onClick={() => {
                          if (events) alert(`clicked: ${JSON.stringify(bar)}`);
                        }}
                        onMouseLeave={() => {
                          tooltipTimeout = window.setTimeout(() => {
                            hideTooltip();
                          }, 300);
                        }}
                        onMouseMove={(event) => {
                          if (tooltipTimeout) clearTimeout(tooltipTimeout);
                          // TooltipInPortal expects coordinates to be relative to containerRef
                          // localPoint returns coordinates relative to the nearest SVG, which
                          // is what containerRef is set to in this example.
                          const eventSvgCoords = localPoint(event);
                          const left = bar.x + bar.width / 2;
                          showTooltip({
                            tooltipData: bar,
                            tooltipTop: eventSvgCoords?.y,
                            tooltipLeft: left,
                          });
                        }}
                      />
                    );
                  } else if (isBottomBar) {
                    return (
                      <path
                        key={`bar-stack-${barStack.index}-${bar.index}`}
                        d={createRoundedRectPath(
                          bar.x,
                          bar.y,
                          bar.width,
                          bar.height,
                          borderRadius,
                          false,
                          true
                        )}
                        fill={bar.color}
                        onClick={() => {
                          if (events) alert(`clicked: ${JSON.stringify(bar)}`);
                        }}
                        onMouseLeave={() => {
                          tooltipTimeout = window.setTimeout(() => {
                            hideTooltip();
                          }, 300);
                        }}
                        onMouseMove={(event) => {
                          if (tooltipTimeout) clearTimeout(tooltipTimeout);
                          // TooltipInPortal expects coordinates to be relative to containerRef
                          // localPoint returns coordinates relative to the nearest SVG, which
                          // is what containerRef is set to in this example.
                          const eventSvgCoords = localPoint(event);
                          const left = bar.x + bar.width / 2;
                          showTooltip({
                            tooltipData: bar,
                            tooltipTop: eventSvgCoords?.y,
                            tooltipLeft: left,
                          });
                        }}
                      />
                    );
                  }

                  // 중간/바닥 막대는 둥글게 처리하지 않음
                  return (
                    <rect
                      key={`bar-stack-${barStack.index}-${bar.index}`}
                      x={bar.x}
                      y={bar.y}
                      height={bar.height}
                      width={bar.width}
                      fill={bar.color}
                      onClick={() => {
                        if (events) alert(`clicked: ${JSON.stringify(bar)}`);
                      }}
                      onMouseLeave={() => {
                        tooltipTimeout = window.setTimeout(() => {
                          hideTooltip();
                        }, 300);
                      }}
                      onMouseMove={(event) => {
                        if (tooltipTimeout) clearTimeout(tooltipTimeout);
                        // TooltipInPortal expects coordinates to be relative to containerRef
                        // localPoint returns coordinates relative to the nearest SVG, which
                        // is what containerRef is set to in this example.
                        const eventSvgCoords = localPoint(event);
                        const left = bar.x + bar.width / 2;
                        showTooltip({
                          tooltipData: bar,
                          tooltipTop: eventSvgCoords?.y,
                          tooltipLeft: left,
                        });
                      }}
                    />
                  );
                })
              )
            }
          </BarStack>
        </Group>
        <AxisLeft
          left={margin.left}
          top={margin.top}
          scale={temperatureScale}
          stroke="none" // prev: purple3
          tickStroke="none" // prev:purple3
          numTicks={6} // y축에 몇개의 숫자를 표시할지
          tickLabelProps={{
            fill: purple3,
            fontSize: 11,
            textAnchor: "end",
          }}
        />
        <AxisBottom
          top={yMax + margin.top}
          left={margin.left}
          scale={dateScale}
          tickFormat={formatDate}
          stroke="none" // prev: purple3
          tickStroke="none" // prev: purple3
          tickLabelProps={{
            fill: purple3,
            fontSize: 11,
            textAnchor: "middle",
          }}
        />
      </svg>
      {/* <div
        style={{
          position: "absolute",
          top: margin.top / 2 - 10,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontSize: "14px",
        }}
      >
        <LegendOrdinal
          scale={colorScale}
          direction="row"
          labelMargin="0 15px 0 0"
        />
      </div> */}

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div style={{ color: colorScale(tooltipData.key) }}>
            <strong>{tooltipData.key}</strong>
          </div>
          <div>{tooltipData.bar.data[tooltipData.key]}℉</div>
          <div>
            <small>{formatDate(getDate(tooltipData.bar.data))}</small>
          </div>
        </TooltipInPortal>
      )}
    </div>
  );
}
