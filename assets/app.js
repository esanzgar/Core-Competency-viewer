// adapted: https://facebook.github.io/react/docs/thinking-in-react.html

// {row.TrainingResourceMapping}
// {row.name}
// {row.domain}
// {row.typeOnlineOrFacetoface}
// {row.typeDetail}
// {row.url}
// {row.bioexcelPartner}
// {row.courseComments}
// bioschemas
// to come: startDate
// to come: endDate
// to come: description
// to come: location
// to come: contact
// to come: hostInstitution
// to come: eventType


// load the json
$('#interactive').html('JavaScript detected..')
$.getJSON( "assets/datasets/ebi-cp-knowledge-base.json", function( data ) {
  // console.log(data);
  $('#interactive').html('Data fetched...')
  renderKb(data);
});



class TrainingResourceCategoryRow extends React.Component {
  render() {
    return (<tr><th colSpan="4">{this.props.category}</th></tr>);
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
        <td>{this.props.TrainingResource.competencyMapping}</td>
        <td>{name}</td>
        <td>{this.props.TrainingResource.typeOnlineOrFacetoface}</td>
        <td>{this.props.TrainingResource.domain}</td>
      </tr>
    );
  }
}

class TrainingResourceTable extends React.Component {
  render() {
    var rows = [];
    var lastCompetency = null;
    // console.log(this.props.faceToFaceTraining)
    // console.log(this.props.onlineTraining)
    this.props.TrainingResources.forEach((TrainingResource) => {
      if (TrainingResource.name.indexOf(this.props.filterText) === -1) {
        return;
      }
      if (!TrainingResource.expired && this.props.enabledOnly) {
        return;
      }
      if ((TrainingResource.typeOnlineOrFacetoface == 'online') && (this.props.onlineTraining === false)) {
        // console.log('fail',TrainingResource.typeOnlineOrFacetoface,this.props.onlineTraining);
        return;
      }
      if ((TrainingResource.typeOnlineOrFacetoface == 'face-to-face') && (this.props.faceToFaceTraining === false)) {
        // console.log('fail',TrainingResource.typeOnlineOrFacetoface,this.props.onlineTraining);
        return;
      }
      // if (TrainingResource.competencyMapping !== lastCompetency) {
      //   rows.push(<TrainingResourceCategoryRow category={TrainingResource.competencyMapping} key={TrainingResource.competencyMapping} />);
      // }
      var uniqueKey = TrainingResource.competencyMapping + "_" + TrainingResource.name + "_";
      // var uniqueKey = TrainingResource.competencyMapping + "_" + TrainingResource.name + "_" + Math.floor(Math.random()*1000);
      rows.push(<TrainingResourceRow TrainingResource={TrainingResource} key={uniqueKey} />);
      lastCompetency = TrainingResource.competencyMapping;
    });
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Competency</th>
              <th>Name</th>
              <th>Domain</th>
              <th>Type</th>
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
    this.handleOnlineTrainingInputChange = this.handleOnlineTrainingInputChange.bind(this);
    this.handleFaceToFaceTrainingInputChange = this.handleFaceToFaceTrainingInputChange.bind(this);
    this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  handleOnlineTrainingInputChange(e) {
    this.props.onOnlineTrainingInput(e.target.checked);
  }

  handleFaceToFaceTrainingInputChange(e) {
    this.props.onFaceToFaceTrainingInput(e.target.checked);
  }

  handleInStockInputChange(e) {
    this.props.onInStockInput(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Filter training resources"
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.onlineTraining}
            onChange={this.handleOnlineTrainingInputChange}
          />
          {' '}
          Show online courses
          {' | '}
          <input
            type="checkbox"
            checked={this.props.faceToFaceTraining}
            onChange={this.handleFaceToFaceTrainingInputChange}
          />
          {' '}
          Show face-to-face
          {' | '}
          <input
            type="checkbox"
            checked={this.props.enabledOnly}
            onChange={this.handleInStockInputChange}
          />
          {'  '}
          Show only active training resources
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
      faceToFaceTraining: true,
      onlineTraining: true,
      enabledOnly: false
    };

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleFaceToFaceTrainingInput = this.handleFaceToFaceTrainingInput.bind(this);
    this.handleOnlineTrainingInput = this.handleOnlineTrainingInput.bind(this);
    this.handleInStockInput = this.handleInStockInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleFaceToFaceTrainingInput(faceToFaceTraining) {
    this.setState({
      faceToFaceTraining: faceToFaceTraining
    })
  }

  handleOnlineTrainingInput(onlineTraining) {
    this.setState({
      onlineTraining: onlineTraining
    })
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
          onFaceToFaceTrainingInput={this.handleFaceToFaceTrainingInput}
          faceToFaceTraining={this.state.faceToFaceTraining}
          onOnlineTrainingInput={this.handleOnlineTrainingInput}
          onlineTraining={this.state.onlineTraining}
          enabledOnly={this.state.enabledOnly}
          onFilterTextInput={this.handleFilterTextInput}
          onInStockInput={this.handleInStockInput}
        />
        <TrainingResourceTable
          TrainingResources={this.props.TrainingResources}
          filterText={this.state.filterText}
          faceToFaceTraining={this.state.faceToFaceTraining}
          onlineTraining={this.state.onlineTraining}
          enabledOnly={this.state.enabledOnly}
        />
      </div>
    );
  }
}

function renderKb(data) {
  $('#interactive').html('Rendering....')
  ReactDOM.render(
    <FilterableTrainingResourceTable TrainingResources={data} />,
    document.getElementById('interactive')
  );
}
