// adapted: https://facebook.github.io/react/docs/thinking-in-react.html


// <td>{row.TrainingResourceMapping}</td>
// <td>{row.name}</td>
// <td>{row.domain}</td>
// <td>{row.typeOnlineOrFacetoface}</td>
// <td>{row.typeDetail}</td>
// <td>{row.url}</td>
// <td>{row.bioexcelPartner}</td>
// <td>{row.courseComments}</td>
// <td>to come: startDate</td>
// <td>to come: endDate</td>
// <td>to come: description</td>
// <td>to come: location</td>
// <td>to come: contact</td>
// <td>to come: hostInstitution</td>
// <td>to come: eventType</td>


// load the json
$.getJSON( "assets/datasets/ebi-cp-knowledge-base.json", function( data ) {
  // console.log(data);
  console.log('data received');

  renderKb(data);
});



class TrainingResourceCategoryRow extends React.Component {
  render() {
    return (<tr><th colSpan="2">{this.props.name}</th></tr>);
  }
}

class TrainingResourceRow extends React.Component {
  render() {
    var name = this.props.TrainingResource.expired ?
      this.props.TrainingResource.name :
      <span style={{color: 'grey'}}>
        {this.props.TrainingResource.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.TrainingResource.domain}</td>
      </tr>
    );
  }
}

class TrainingResourceTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    console.log(this.props.enabledOnly)
    this.props.TrainingResources.forEach((TrainingResource) => {
      if (TrainingResource.name.indexOf(this.props.filterText) === -1 || (!TrainingResource.expired && this.props.enabledOnly)) {
        return;
      }
      if (TrainingResource.category !== lastCategory) {
        rows.push(<TrainingResourceCategoryRow category={TrainingResource.category} key={TrainingResource.category} />);
      }
      rows.push(<TrainingResourceRow TrainingResource={TrainingResource} key={TrainingResource.name} />);
      lastCategory = TrainingResource.category;
    });
    return (
      <div>
        <h2>
          BioExcel Core Competency: Knowledge Base
        </h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Domain</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  handleInStockInputChange(e) {
    this.props.onInStockInput(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.enabledOnly}
            onChange={this.handleInStockInputChange}
          />
          {' '}
          Only show active training resources
        </p>
      </form>
    );
  }
}

class FilterableTrainingResourceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      enabledOnly: false
    };

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleInStockInput = this.handleInStockInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInStockInput(enabledOnly) {
    this.setState({
      enabledOnly: enabledOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          enabledOnly={this.state.enabledOnly}
          onFilterTextInput={this.handleFilterTextInput}
          onInStockInput={this.handleInStockInput}
        />
        <TrainingResourceTable
          TrainingResources={this.props.TrainingResources}
          filterText={this.state.filterText}
          enabledOnly={this.state.enabledOnly}
        />
      </div>
    );
  }
}

function renderKb(data) {
  ReactDOM.render(
    <FilterableTrainingResourceTable TrainingResources={data} />,
    document.getElementById('main-content-area')
  );
}
