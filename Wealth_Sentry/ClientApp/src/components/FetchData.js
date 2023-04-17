import React, { Component } from 'react';
import { Bar, Pie} from "react-chartjs-2";
import { Doughnut } from '../../node_modules/react-chartjs-2/dist/index';

export class FetchData extends Component {
  static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    };


  componentDidMount() {
    this.populateWeatherData();
    }
    static renderGraph(forecasts, fieldname, Title) {
        return (
            <div className="chart-container">
                <h2 style={{ textAlign: "center" }}></h2>
                <Pie
                    data={{
                        labels: forecasts.map(forecast => forecast.summary),
                        datasets: [{
                            label: 'Popularity of colours',
                            data: forecasts.map(forecast => eval("forecast."+fieldname))
                                ,
                            backgroundColor: [
                                '#03254c',
                                '#1167b1',
                                '#187bcd',
                                '#2a9df4',
                                '#d0efff'
                            ],
                            borderWidth: 1,
                        }
                        ]
                    }}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: Title
                            },
                            legend: {
                                display: true
                            }
                        }
                    }}
                />
            </div>     
            );
    };
  static renderForecastsTable(forecasts) {
      return (
    
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
                  <tr class="table-dark">
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
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
           : FetchData.renderForecastsTable(this.state.forecasts);
       let graphcontent1 = FetchData.renderGraph(this.state.forecasts, "temperatureF", "Asset class breakdown");
       let graphcontent2 = FetchData.renderGraph(this.state.forecasts, "temperatureC", "Industry breakdown");
    return (
      <div>
        <h1 id="tabelLabel" >Portfolio breakdown</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <div className="Fluid_row">
                {contents}
            </div>
            <div className="Fluid_row">
                {graphcontent1}

                {graphcontent2}
            </div>
       </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
