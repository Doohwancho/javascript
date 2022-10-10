import cytoscape from 'cytoscape';

import './style.css';
// webpack으로 묶어줘야 하니 css파일을 진입점인 index.js 에 import 합니다

import coseBilkent from 'cytoscape-cose-bilkent'; //cose-bilkent layout
cytoscape.use(coseBilkent);

import data from './model/data.js'; //import json





const cy_for_rank = cytoscape({ // rank를 활용하기 위해 data만 입력한 cytoscape 객체입니다
    elements: data
});


const pageRank = cy_for_rank.elements().pageRank();// elements들의 rank. target이 많이 될 수록 rank가 올라감. 이걸 바탕으로 node.size()정함


//size of node & font
const nodeMaxSize = 50;
const nodeMinSize = 5;
const nodeActiveSize = 28;
const fontMaxSize = 8;
const fontMinSize = 5;
const fontActiveSize = 7;


//size of edge & arrow
const edgeWidth = '2px';
var edgeActiveWidth = '4px';
const arrowScale = 0.8;
const arrowActiveScale = 1.2;


//color
const dimColor = '#dfe4ea';
const edgeColor = '#ced6e0';
const nodeColor = '#57606f';
const nodeActiveColor = '#ffa502';

const successorColor = '#ff6348'; //ff6348
const predecessorsColor = '#3ecded'; //1e90ff



const cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    elements: data,

    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(label)', //json의 data.label이 보이게 만듬. data(id)하면 id가 보임
                'width': function (ele) { //상위 node일 수록 더 크게
                    return nodeMaxSize *  pageRank.rank('#' + ele.id())  + nodeMinSize;
                },
                'height': function (ele) {
                    return nodeMaxSize *  pageRank.rank('#' + ele.id()) + nodeMinSize;
                },
                'font-size': function (ele) {
                    return fontMaxSize *   pageRank.rank('#' + ele.id()) + fontMinSize;
                },
                'color': nodeColor,
            }
        },
        {
            selector: 'edge',
            style: {
                'width': edgeWidth,
                'curve-style': 'bezier',
                'line-color': edgeColor,
                'target-arrow-color': edgeColor, //source-arrow-color로 바꾸기 가능. 화살표 방향 바꿀 때 사용
                'target-arrow-shape': 'vee',
                'arrow-scale': arrowScale
            }
        }
    ],

    //import한 cose-bilkent layout 설정
    layout: {
        name: 'cose-bilkent',
        animate: false,
        gravityRangeCompound: 1.5,
        fit: true,
        tile: true
    }
});


/* UI/UX functions */

cy.on('tap', function (e) {
    const url = e.target.data('url')
    if (url && url !== '') {
        window.open(url);
    }
});


cy.on('tapstart mouseover', 'node', function (e) {
    setDimStyle(cy, {
        'background-color': dimColor,
        'line-color': dimColor,
        'target-arrow-color': dimColor,
        'color': dimColor
    });

    setFocus(e.target, successorColor, predecessorsColor, edgeActiveWidth, arrowActiveScale);
});

cy.on('tapend mouseout', 'node', function (e) {
    setResetFocus(e.cy);
});



/* mouse in/out highlight function */

function setDimStyle(target_cy, style) {
    target_cy.nodes().forEach(function (target) {
        target.style(style);
    });
    target_cy.edges().forEach(function (target) {
        target.style(style);
    });
}

function setFocus(target_element, successorColor, predecessorsColor, edgeWidth, arrowScale) {
    target_element.style('background-color', nodeActiveColor);
    target_element.style('color', nodeColor);
    target_element.successors().each(function (e) {
        // 상위  엣지와 노드
        if (e.isEdge()) {
            e.style('width', edgeWidth);
            e.style('arrow-scale', arrowScale);
        }
        e.style('color', nodeColor);
        e.style('background-color', successorColor);
        e.style('line-color', successorColor);
        e.style('target-arrow-color', successorColor);
        setOpacityElement(e, 0.5);
    }
    );
    target_element.predecessors().each(function (e) {
        // 하위 엣지와 노드
        if (e.isEdge()) {
            e.style('width', edgeWidth);
            e.style('arrow-scale', arrowScale);
        }
        e.style('color', nodeColor);
        e.style('background-color', predecessorsColor);
        e.style('line-color', predecessorsColor);
        e.style('target-arrow-color', predecessorsColor);
        setOpacityElement(e, 0.5);
    });
    target_element.neighborhood().each(function (e) {
        // 이웃한 엣지와 노드
        setOpacityElement(e, 1);
    }
    );
    target_element.style('width', Math.max(parseFloat(target_element.style('width')), nodeActiveSize));
    target_element.style('height', Math.max(parseFloat(target_element.style('height')), nodeActiveSize));
    target_element.style('font-size', Math.max(parseFloat(target_element.style('font-size')), fontActiveSize));
}

function setOpacityElement(target_element, degree) {
    target_element.style('opacity', degree);
}

function setResetFocus(target_cy) {
    target_cy.nodes().forEach(function (target) {
        target.style('background-color', nodeColor);
        var rank = pageRank.rank(target);
        target.style('width', nodeMaxSize * rank + nodeMinSize);
        target.style('height', nodeMaxSize * rank + nodeMinSize);
        target.style('font-size', fontMaxSize * rank + fontMinSize);
        target.style('color', nodeColor);
        target.style('opacity', 1);
    });
    target_cy.edges().forEach(function (target) {
        target.style('line-color', edgeColor);
        target.style('target-arrow-color', edgeColor);
        target.style('width', edgeWidth);
        target.style('arrow-scale', arrowScale);
        target.style('opacity', 1);
    });
}



//브라우저 크기에 따른 자동 크기 조정
let resizeTimer;

window.addEventListener('resize', function () {
    this.clearTimeout(resizeTimer);
    resizeTimer = this.setTimeout(function(){
        cy.fit();
    },200);
});
