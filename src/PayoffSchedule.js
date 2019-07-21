import React from 'react';
import ReactEcharts from 'echarts-for-react';

// Base64 image strings for bar colors
const currPrincipalBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAABEUlEQVQokS3QQXIQQQxD0S+5E7gLl+D+VdyHMG2JxcRrl/Us/fn1+3z+fJ6/ksU7klQAutfzISmNkXevEKUlbdvdtceyzwew96E9nqHIp4RWGiEE7b1f9ikgACe3TZu9F5Tdkhdxzg+EkH2QLA00Wc/MHNtNmm2TrH1QEU0sah/bFMAe2cm2IDULFio1uA1U0vN8JQvMfEjQlPfiMz7vHjOf45k5bSjQtpJogCSyLFnSvf9CZc+cUpA9kq1pK02z/v7Xzl4KktDm7j5JC1B72p69t/YbmSzUPqNTml14WwKNbb8Vj7+jd5+2zUumYI81p418gHRbsDwH0aakqaRIoDPzaSut5Ox9Ja+mL1XKrjz/AXht4F5l79hUAAAAAElFTkSuQmCC';

const newPrincipalBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAA/ElEQVQokS2SwW0AQQgDx2YvzaT/BtJVksPOY/NDSDBmhL6/PgEkjZvoDGl3NcOYgOjvi3QQyCRtsdnwPLzbd9kgJCNBrXOgWJJuQcIz9DZdCiU9fV+AqlkE5yCE2rIpaIzU8UFGkFCQuktNAlxCE7Ycm4RdANA5pGwoPAdJ9v8Msj4ebM1g9ffVc+T/BAJmZOsM3KybtkhYSJVkN6G9QIFmDgiBRSFtX0ElrpEWi6qt2WWGAsgCWpDYZaznsGlDcmQ3hWqmIBnaBNSflzG2pCYHS1dTq7ZALgJGbO4BgC+u3FySjXW/giKLzVV5SGrdLaV9l+vyNmxK36X9A2F2szwzIcVHAAAAAElFTkSuQmCC';

const PayoffSchedule = ({ offsets, paths, user, colors }) => {
  // console.log(user);

  let principalCurrBg = new Image();
  principalCurrBg.src = currPrincipalBg;

  let principalNewBg = new Image();
  principalNewBg.src = newPrincipalBg;

  const payoffDateCurr =
    user.payoffDateCurr ?
    user.payoffDateCurr :
    '';
  const payoffDateNew =
    user.payoffDateNew ?
    user.payoffDateNew :
    '';

  // const svgClasses = classNames('svg-bars',
  //   { 'unset': (!offsets.paid.original && !offsets.paid.new) }
  // );

  const echartPayoffDateCurr =
    user.nperCurr ?
    user.nperCurr :
    0;
  const echartPayoffDateNew =
    user.nperNew ?
    user.nperNew :
    0;

  const options = {
    id: "payoffSchedule",
    tooltip : {
        trigger: 'axis',
        confine: false,
        axisPointer : {
            type : 'none'
        },
        padding: [6, 10],
        formatter: (params) => {
          // console.log(params);
          if (!!params[0].value) {
            return '<strong>' + params[0].axisValueLabel + '</strong><br>&nbsp;' +
            // params[0].marker + '&nbsp;'
            + params[0].value + ' PAYMENT PERIOD(S)';
          } else {
            return '';
          }
        },
        textStyle: {
          fontFamily: 'Vasarely',
          fontSize: 16,
          color: '#000',

        },
        backgroundColor: '#FFEBAE',
        borderColor: '#000',
        borderWidth: 1,
        extraCssText: 'border-radius:0;'
    },
    legend: {
        data: ['CURRENT TIMELINE', 'NEW TIMELINE']
    },
    grid: {
      left: 0,
      top: 20,
      width: '100%',
      height: 70,
      containLabel: true
    },
    xAxis:  {
      type: 'value',
      show: false
    },
    yAxis: {
      type: 'category',
      data: ['NEW TIMELINE', 'CURRENT TIMELINE'],
      show: true,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontFamily: 'Vasarely',
        fontSize: 18,
        verticalAlign: 'middle',
        padding: [0, 0, 5, 0],
      }
    },
    barWidth: 10,
    barGap: 0,
    series: [
      {
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        data: [
          { // New timeline
            value: echartPayoffDateNew,
            name: "newTimeline",
            itemStyle: {
              // color: colors.principalNew,
              color: {
                image: principalNewBg,
                repeat: 'repeat'
              },
            },
            label: {
              borderColor: 'transparent',
              color: colors.darkFont,
              fontFamily: 'Vasarely',
              fontSize: 16,
              show: true,
              position: 'bottom', // 'insideTopRight',
              padding: [0, 0, 0, 0],
              formatter: (el) => {
                if (!!echartPayoffDateNew) {
                  return payoffDateNew;
                } else {
                  return '';
                }
              }
            }
          }, // End new timeline
          { // Old timeline
            value: echartPayoffDateCurr,
            name: "oldTimeline",
            itemStyle: {
              // color: colors.principalOld,
              color: {
                image: principalCurrBg,
                repeat: 'repeat'
              },
            },
            label: {
              borderColor: 'transparent',
              color: colors.darkFont,
              fontFamily: 'Vasarely',
              fontSize: 16,
              value: payoffDateCurr,
              show: true,
              position: 'top', // 'insideBottomRight',
              padding: [0, 0, 0, 0],
              formatter: (el) => {
                if (!!echartPayoffDateCurr) {
                  return payoffDateCurr;
                } else {
                  return '';
                }
              }
            }
          }]
        }, // End old timeline
    ]
  };

  // opts={{renderer: 'svg'}}

  return (
    <div className="payoff-sched-parent">
      <ReactEcharts
        option={options}
        style={{height: '100px', width: '100%'}}
      />
    </div>
  );
}

export default PayoffSchedule;
