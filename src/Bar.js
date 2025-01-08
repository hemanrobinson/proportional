import * as d3 from 'd3';
import Graph from './Graph';
import './Graph.css';

/**
 * Bar chart in an SVG element.
 */
const Bar = () => {
};

/**
 * Draws the bar chart.
 *
 * @param  {Element} selection      d3 selection
 * @param  {number}  x              X coordinate, in pixels
 * @param  {number}  y              Y coordinate, in pixels
 * @param  {number}  width          width, in pixels
 * @param  {number}  height         height, in pixels
 * @param  {Array}   sums           sums
 * @param  {Array}   sumsSelected   selected sums
 * @param  {boolean} isHorz         true iff bars are horizontal, otherwise vertical
 */
Bar.draw = ( selection, x, y, width, height, sums, sumsSelected, isHorz ) => {
    
    if( isHorz ) return;
    
    // Initialization.
    Graph.draw( selection, x, y, width, height );
    const margin = Graph.margin,
        xScale = d3.scaleBand()
            .domain( sums.map( d => d[ 0 ]))
            .range([ width * margin, width * ( 1 - margin )])
            .padding( 0.1 ),
        yScale = d3.scaleLinear()
            .domain([ d3.min( sums, d => d[ 1 ]), d3.max( sums, d => d[ 1 ])])
            .range([ height * ( 1 - margin ), height * margin ]);
    
    // Draw the bars.
    selection.selectAll( ".all" )
        .data( sums )
        .enter()
        .append( "rect" )
        .classed( 'all', true )
        .attr( "x", ( d ) => xScale( d[ 0 ]))
        .attr( "y", ( d ) => ( d[ 1 ] >= 0 ) ? yScale( d[ 1 ]) : yScale( 0 ))
        .attr( "width", xScale.bandwidth())
        .attr( "height", ( d ) => (( xScale.domain().indexOf( d[ 0 ]) >= 0 ) ? Math.max( 0,
             ( d[ 1 ] >= 0 ) ? ( yScale( 0 ) - yScale( d[ 1 ])) : ( yScale( d[ 1 ]) - yScale( 0 ))) : 0 ));
    selection.selectAll( ".selected" )
        .data( sumsSelected )
        .enter()
        .append( "rect" )
        .classed( 'selected', true )
        .attr( "x", ( d ) => xScale( d[ 0 ]))
        .attr( "y", ( d ) => ( d[ 1 ] >= 0 ) ? yScale( d[ 1 ]) : yScale( 0 ))
        .attr( "width", xScale.bandwidth())
        .attr( "height", ( d ) => (( xScale.domain().indexOf( d[ 0 ]) >= 0 ) ? Math.max( 0,
             ( d[ 1 ] >= 0 ) ? ( yScale( 0 ) - yScale( d[ 1 ])) : ( yScale( d[ 1 ]) - yScale( 0 ))) : 0 ));
             
    // Draw the axis.
    selection.selectAll( "line" )
        .data( sums )
        .enter()
        .append( "line" )
        .classed( 'grid', true )
        .attr( "x1", width * margin )
        .attr( "y1", yScale( 0 ))
        .attr( "x2", width * ( 1 - margin ))
        .attr( "y2", yScale( 0 ))
};

export default Bar;
