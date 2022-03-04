//jshint esversion: 9
import React from "react";
import Rete from "rete";
import ConnectionPlugin from 'rete-connection-plugin';
import ReactRenderPlugin from "rete-react-render-plugin";

const numSocket = new Rete.Socket('Number value');

class NumComponent extends Rete.Component {
    constructor() {
        super('Number');
    }

    builder(node) {
        let out = new Rete.Output('num', 'Number', numSocket);

        node.addOutput(out);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
    }
}

function Home() {

    return (<NumComponent />);
}

export default Home;
