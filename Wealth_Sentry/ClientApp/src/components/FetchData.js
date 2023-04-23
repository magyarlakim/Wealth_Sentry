import React, { Component, useState, useRef } from 'react';
import { Bar, Pie} from "react-chartjs-2";
import { Doughnut } from '../../node_modules/react-chartjs-2/dist/index';
import ProgressBar from 'react-bootstrap/ProgressBar';

export class FetchData extends Component {
  static displayName = FetchData.name;
  constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true, riskStatus: false, progresStatus:0 };
        this.handleClick = this.handleClick.bind(this);
    };

  handleClick() {
      let status = this.state.riskStatus ? false : true;
      let statusAsText = this.state.riskStatus ? "Increase the risk" : "Decrease the risk";
      let progressIncrease = this.state.riskStatus ? -10 : +20;
      this.setState({
          riskStatus: status, progresStatus: this.state.progresStatus + progressIncrease
      });
      let RiskButton = document.getElementById("TensionButton");
      RiskButton.innerHTML = statusAsText;
    //alert('Tension increased '+this.state.riskStatus);
    }
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
    static renderGraphCustom(inputArray, Title) {
        return (
            <div className="chart-container">
                <h2 style={{ textAlign: "center" }}></h2>
                <Pie
                    data={{
                        labels: ["A","B","C","D"],
                        datasets: [{
                            label: 'Popularity of colours',
                            data: inputArray
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
    static renderAlert(riskStatus) {
        let alert = riskStatus ? <button type="button" class="btn btn-success">Situation has stabilized{riskStatus}</button>
            : <button type="button" class="btn btn-danger">We have a massive issue{riskStatus}</button>
        return (alert
        );
    };
    static progressBar(currentProgress) {
        return (
                <div>
                <ProgressBar animated now={currentProgress} label={`${currentProgress}%`} />
            </div>);
    };
   render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
           : FetchData.renderForecastsTable(this.state.forecasts);
    let graphcontent1 = FetchData.renderGraph(this.state.forecasts, "temperatureF", "Asset class breakdown");
       let graphcontent2 = FetchData.renderGraph(this.state.forecasts, "temperatureC", "Industry breakdown");
       let graph3 = FetchData.renderGraphCustom([1, 4, 6, this.state.progresStatus], "User defined riskweights");
       let statusContent = FetchData.renderAlert(this.state.riskStatus);
       let progressToDisplay = FetchData.progressBar(this.state.progresStatus);
    return (
      <div>
            <h1 id="tabelLabel" >Portfolio breakdown</h1>
            
            {progressToDisplay}
            
            <br></br>
            <div className="Fluid_row">
                <button className="btn btn-primary" id="TensionButton" onClick={this.handleClick}>Increase the Tension</button>
                {statusContent}
                
            </div>
            <p>This component demonstrates fetching data from the server.</p>
            <div className="Fluid_row">
                {contents}
            </div>
            <div className="Fluid_row">
                {graphcontent1}
                {graph3}
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
