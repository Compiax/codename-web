import { UUID } from 'angular2-uuid';
import { ComponentModel } from './component.model';
import { Node } from './node.model';

export class InputNode extends Node {
    public outCircle: any;
    public mainCircle: any;
    public text: any;
    public component: {
        name: 'Output',
        author: 'Base'
    };

    public values: number[];
    public dimensions: number[];

    public updatePosition(x, y) {
        super.updatePosition(x, y);

        this.mainCircle.attr('cx', x);
        this.mainCircle.attr('cy', y);
        this.outCircle.attr('cx', x + 32);
        this.outCircle.attr('cy', y);
        this.text.attr('x', x);
        this.text.attr('y', y + 5);
    }

    public toJSON() {
        const json = super.toJSON();
        json.type = 'Input';
        json.variable = {
            values: this.values,
            dimensions: this.dimensions
        };
        return json;
    }

    constructor(group: any, coords?: {x: number, y: number}, id?: string) {
        id = (id || `input-${UUID.UUID()}`);
        super(group, 0, coords, id);

        this.values = [1, 1, 1, 1];
        this.dimensions = [2, 2];

        this.group.datum({node: this});

        this.outCircle =
        this.group.append('circle')
            .attr('r', 7)
            .attr('fill', 'grey')
            .datum({node: this, type: 'output'});

        this.mainCircle =
        this.group.append('circle')
            .attr('r', 30)
            .attr('fill', '#EEEEEE')
            .attr('stroke-width', '5px')
            .attr('stroke', '#D32F2F')
            .datum({node: this});

        this.text =
        this.group.append('text')
          .attr('text-anchor', 'middle')
          .text('IN')
          .style('fill', '#D32F2F');

        this.updatePosition(coords.x, coords.y);
    }
}
