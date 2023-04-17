import React, { Component } from 'react';
import { CategoryScale } from "chart.js";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Portfolio risk and return calculator</h1>
        <p>Please select from the services below:</p>
        <ul>
                <li>Date loading and preprocessing</li>
                <li>Portfolio construction</li>
                <li>Risk and return measurement</li>
            </ul>
            <div class="chart-container">
                <img className="frontpage_img" src="/Jungle.png" width="800px"/>
            </div>
        
      </div>
    );
  }
}
