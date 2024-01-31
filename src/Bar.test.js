import * as d3 from 'd3';
import Graph from './Graph';
import Bar from './Bar';

// Sets up a DOM element as a render target.
beforeEach(() => {
});

// Cleans up on exit.
afterEach(() => {
});

it( "creates a Bar element", () => {
    expect( Bar()).toBe( undefined );
});

it( "draws the Bar chart", () => {
    let xScale = d3.scaleBand().domain([ 0, 1 ]).range([ 0, 100 ]),
        yScale = d3.scaleLinear().domain([ 0, 1 ]).range([ 0, 100 ]);
    Bar.draw( d3.selection(), 0, 0, 400, 400, xScale, yScale, [ 0, 1 ], [ 0, 1 ], "X", "Y", []);
});
