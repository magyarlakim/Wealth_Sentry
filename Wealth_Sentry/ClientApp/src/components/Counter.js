import React, { Component } from 'react';
import { Bar } from "react-chartjs-2";


export class Counter extends Component {
  static displayName = Counter.name;
  
  constructor(props) {
      super(props);
      this.state = { currentCount: 0, forecasts: [], loading:true};
    this.incrementCounter = this.incrementCounter.bind(this);
    
  }

  componentDidMount() {
        this.populateSecurityData();
    }
  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }
    static renderForecastsTable(forecasts) {
        return (

            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr class="table-dark">
                        <th>Date</th>
                        <th>Price</th>
                        <th>Forecasted Price</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.price}</td>
                            <td>{forecast.price_Derived}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Counter.renderForecastsTable(this.state.forecasts);

      return (
          <div>
      <div>
        <h1>Data Loader</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
              </div>
              <div className="Fluid_row">
              <div className="chart-container">
                  
      
      <Bar
                      data={{
                          labels: this.state.forecasts.map(forecast => forecast.date),
                          
                          datasets: [
                              {
                                  label: 'Portfolio 1',
                                  data: this.state.forecasts.map(forecast => forecast.price),
                                  // you can set indiviual colors for each bar
                                  backgroundColor: [
                                      '#03254c',
                                      '#1167b1',
                                      '#187bcd',
                                      '#2a9df4',
                                      '#d0efff'
                                  ],
                                  borderWidth: 1,
                              },
                              {
                                  label: 'Portfolio 2',
                                  data: this.state.forecasts.map(forecast => forecast.price_Derived),
                                  // you can set indiviual colors for each bar
                                  backgroundColor: [
                                      '#f4f4f4',
                                      '#747774',
                                      '#8d908e',
                                      '#444644',
                                      '#747774'
                                  ],
                                  borderWidth: 1,
                              }
                          ]
                      }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Portfolio performance in 2023"
            },
            legend: {
              display: true
            }
          }
        }}
      />
              </div>
              <div className="chart-container">
                  {contents}
              </div>
          </div>
          </div>
    );
  }


async populateSecurityData() {
    const response = await fetch('securitydata');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
    }
}