import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DependencyGraph = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const nodes = [
      { id: 0, name: "Study Hours", type: "input", color: "#6366F1" },
      { id: 1, name: "Sleep", type: "input", color: "#6366F1" },
      { id: 2, name: "Previous GPA", type: "input", color: "#6366F1" },
      { id: 3, name: "Attendance", type: "input", color: "#6366F1" },
      { id: 4, name: "Stress", type: "input", color: "#F59E0B" },
      { id: 5, name: "Final GPA", type: "output", color: "#10B981" },
      { id: 6, name: "Dropout Risk", type: "output", color: "#EF4444" },
    ];

    const links = [
      { source: 0, target: 5, strength: 0.7 },
      { source: 1, target: 5, strength: 0.5 },
      { source: 2, target: 5, strength: 0.8 },
      { source: 3, target: 5, strength: 0.6 },
      { source: 4, target: 5, strength: -0.4 },
      { source: 4, target: 6, strength: 0.7 },
      { source: 3, target: 6, strength: -0.5 },
      { source: 0, target: 4, strength: 0.3 },
    ];

    const width = svgRef.current.parentElement.clientWidth || 800;
    const height = 550;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'transparent');

    svg.selectAll('*').remove();

    const g = svg.append('g');

    // Zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Arrow markers
    svg.append('defs').selectAll('marker')
      .data(['positive', 'negative'])
      .join('marker')
      .attr('id', d => `arrow-${d}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 30)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', d => d === 'positive' ? '#10B981' : '#EF4444');

    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', d => d.strength > 0 ? '#10B981' : '#EF4444')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.abs(d.strength) * 3)
      .attr('marker-end', d => d.strength > 0 ? 'url(#arrow-positive)' : 'url(#arrow-negative)');

    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(drag(simulation));

    // Outer glow ring
    node.append('circle')
      .attr('r', 28)
      .attr('fill', d => d.color)
      .attr('fill-opacity', 0.15)
      .attr('stroke', d => d.color)
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.4);

    // Main circle
    node.append('circle')
      .attr('r', 20)
      .attr('fill', d => d.color)
      .attr('fill-opacity', 0.85)
      .style('cursor', 'pointer');

    // Label background
    node.append('rect')
      .attr('x', d => -d.name.length * 3.2)
      .attr('y', 26)
      .attr('width', d => d.name.length * 6.4)
      .attr('height', 16)
      .attr('fill', 'rgba(10,10,15,0.75)')
      .attr('rx', 4);

    // Label text
    node.append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', 38)
      .attr('fill', 'white')
      .style('font-size', '10px')
      .style('font-family', 'Inter, sans-serif')
      .style('font-weight', '600')
      .style('pointer-events', 'none');

    // Icon in circle
    node.append('text')
      .text(d => {
        if (d.type === 'output') return d.color === '#10B981' ? '★' : '⚠';
        return '●';
      })
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'white')
      .style('font-size', d => d.type === 'output' ? '14px' : '8px')
      .style('pointer-events', 'none');

    // Hover effects
    node.on('mouseenter', function () {
      d3.select(this).select('circle:nth-child(1)').transition().duration(200).attr('r', 34).attr('fill-opacity', 0.25);
      d3.select(this).select('circle:nth-child(2)').transition().duration(200).attr('r', 24);
    }).on('mouseleave', function () {
      d3.select(this).select('circle:nth-child(1)').transition().duration(200).attr('r', 28).attr('fill-opacity', 0.15);
      d3.select(this).select('circle:nth-child(2)').transition().duration(200).attr('r', 20);
    });

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    const handleResize = () => {
      if (!svgRef.current) return;
      const newWidth = svgRef.current.parentElement.clientWidth;
      svg.attr('width', newWidth);
      simulation.force('center', d3.forceCenter(newWidth / 2, height / 2));
      simulation.alpha(0.3).restart();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <svg ref={svgRef} style={{ width: '100%', height: '550px' }} />;
};

export default DependencyGraph;
