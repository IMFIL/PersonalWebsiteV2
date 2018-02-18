import React from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import styles from './css/index.css'
import swal from 'sweetalert2';
import {
  infoText,
  textShadowClicked,
  LETLA,
  calculateLifeEventSizeAndBackground,
  projectsItems
} from './utils/utils.js'
import 'font-awesome/css/font-awesome.min.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import MediaQuery from 'react-responsive';
import Favicon from 'react-favicon';
import {BackgroundMobile} from './utils/mobile.js'
import Swipe from 'react-swipe-component';

const ReactHighcharts = require('react-highcharts')

class PageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'scrollingState': window.location.pathname === '/' ? 0 : 220,
      'displayScroll': window.location.pathname === '/',
      'fixNavBar': window.location.pathname === '/' ? false : true,
      'path': window.location.pathname //disgusting but oh well

    }
  }

  componentDidMount = () => {
    document.title = "Filip Slatinac";
  }

  expandNavBar = () => {
    this.setState({
      'scrollingState': 220,
      'displayScroll': false
    })
  }

  collapseNavBar = () => {
    this.setState({
      'scrollingState': 0,
      'displayScroll': true
    })
  }

  moveNavBar = (event) => {
    if (window.location.pathname === '/') {
      if (this.state.displayScroll) {
        this.expandNavBar()
      }

      else if (!this.state.displayScroll) {
        this.collapseNavBar()
      }
    }
  }

  changeRoute = (route) => {
    this.setState({
      'scrollingState': window.location.pathname === '/' ? 0 : 220,
      'displayScroll': window.location.pathname === '/',
      'path': route
    })
  }


  render () {
    return (
    <div className='pageContainer'>
      <Favicon url={require('./images/favicon.png')}/>
      <MediaQuery minDeviceWidth={1030}>
      <Swipe
        mouseSwipe = {false}
        className = 'pageContainer'
        onSwipedDown = {this.collapseNavBar}
        onSwipedUp = {this.expandNavBar}
        >
          <div className='pageContainer' >
            <NavBar width={this.state.scrollingState}  currentRoute={this.state.path} changeRoute={this.changeRoute.bind(this)}/>
            <Background displayScroll={this.state.displayScroll} clickEvent={this.moveNavBar.bind(this)}/>
          </div>
        </Swipe>
      </MediaQuery>

      <MediaQuery minDeviceWidth={501} maxDeviceWidth={1030}>
        <Router><BackgroundMobile/></Router>
      </MediaQuery>

      <MediaQuery maxDeviceWidth={500}>
        <Router><BackgroundMobile/></Router>
      </MediaQuery>
    </div>
    )
  }
}

class NavBar extends React.Component {
  render () {
    let styles = {
        width:this.props.width,
        // borderRight:this.props.width===220 ? '#E6E6E6 1px solid' : 'none'
        boxShadow: 'rgba(1, 1, 1, 0.5) 0px 0px 20px 20px'
      }

    return (
        <div className='navBar' style={styles}>
          <NavBarItem title='Home' link='/' currentRoute={this.props.currentRoute} changeRoute={this.props.changeRoute}/>
          <NavBarItem title='Projects' link='/projects' currentRoute={this.props.currentRoute}  changeRoute={this.props.changeRoute}/>
          <NavBarItem title='About Me' link='/me/life'  currentRoute={this.props.currentRoute}  changeRoute={this.props.changeRoute}/>
          <NavBarItem title='Contact' link='/contact'currentRoute={this.props.currentRoute}  changeRoute={this.props.changeRoute}/>
        </div>
    )
  }
}

class NavBarItem extends React.Component {
  render () {
    let aboutMeOthers = (this.props.currentRoute == '/me/work' || this.props.currentRoute == '/me/interests') && this.props.link == '/me/life'
    let styles = {
      borderLeft:  this.props.link === this.props.currentRoute || aboutMeOthers ? textShadowClicked : ''
    }

    return (
      <div className='navBarItemContainer'>
        <p className='navBarItem' style={{...styles}} onClick={()=>this.props.changeRoute(this.props.link)}>
          <Link to={this.props.link}>
            {this.props.title}
          </Link>
        </p>
      </div>
    )
  }
}

class HomePath extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div className='contentContainer' onClick={this.props.clickEvent}>
        <p className='nameDisplay'>Filip Slatinac</p>
        <p className='displayAttributes'>
          - Insert Typical Software Engineering Student Desicription Here -
        </p>
      </div>
    )
  }
}

class ProjectsPath extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'id': 0
    }
  }

  frontPicture = () => {
    this.setState({
      'id': this.state.id < projectsItems.length - 1 ? this.state.id + 1 : 0
    })
  }

  backPicture = () => {
    this.setState({
      'id': this.state.id > 0 ? this.state.id - 1 : projectsItems.length - 1
    })
  }

  handleIndicatorClick = (index) => {
    this.setState({
      'id': index
    })
  }

  render() {

    let rightButtonStyles = {
      color: 'white',
      marginLeft: 80,
      cursor: 'pointer'
    }

    let leftButtonStyles = {
      color: 'white',
      marginRight: 80,
      cursor: 'pointer'
    }

    let contentContainerStyles = {
      flexDirection: 'row',
      paddingTop: 0
    }

    let circlesIndicators = []
    let circlesIndicatorStyles = {
      color: 'white',
      cursor: 'pointer',
      marginLeft: 10,
      marginRight: 10
    }

    for (let i = 0; i < projectsItems.length; i++) {
      circlesIndicators.push(<i className={this.state.id === i ? 'fa fa-circle' : 'fa fa-circle-thin'} style={circlesIndicatorStyles} aria-hidden="true" onClick={() => this.handleIndicatorClick(i)} />)
    }
    return (
      <div className='contentContainer' style={contentContainerStyles}>
          <div className='projectContainer'>
            <ProjectItem
              title={projectsItems[this.state.id].title}
              description={projectsItems[this.state.id ].description}
              src={projectsItems[this.state.id].src}
              style={projectsItems[this.state.id]}
              fullDescription={projectsItems[this.state.id].fullDescription}
              tags={projectsItems[this.state.id].tags}
              link={projectsItems[this.state.id].link}
            />
            <div className='chevronContainer' style={{display: 'flex'}}>
              <i className="fa fa-chevron-left fa-2x" style={leftButtonStyles} aria-hidden="true" onClick={this.backPicture}/>
              <div className='currentProjectIndiacatorsContainer'>
                {circlesIndicators}
              </div>
              <i className="fa fa-chevron-right fa-2x" style={rightButtonStyles} aria-hidden="true" onClick={this.frontPicture}/>
            </div>
          </div>
      </div>
    )
  }
}

class ProjectItem extends React.Component {

  componentWillMount() {
    this.setState({
      newImageWidth: this.props.style.styleL['width'],
      newImageHeight: this.props.style.styleL['height']

    })
  }

  componentWillReceiveProps(nextProps, nextState) {

    this.setState({
      newImageWidth: nextProps.style.styleL['width'],
      newImageHeight: nextProps.style.styleL['height']
    })
  }

  componentDidUpdate() {
    let descriptionContainer = document.getElementsByClassName('descriptionContainer')[0]
    descriptionContainer.scrollTop = descriptionContainer.clientTop
  }

  render() {
    let tags = this.props.tags.map(function(tag) {
      return <span className='singleTagContainer'><p className='tagText'>{tag}</p></span>
    })

    return (
      <div className='projectItemContainer'>
        <div className='projectViewContainer'>
          <span className='projectTitle'>
            <a className='gitHubTitleLink' href={this.props.link} target='_blank'><i className="fa fa-github" aria-hidden="fal"></i></a>
            {this.props.title}
          </span>
          <span className='projectDescription'>
            {this.props.description}
          </span>
        </div>
          <div className='descriptionContainer'>
            <div className='imageHolderContainer'>
              <img style={{width: this.state.newImageWidth}} className='projectImage'  src={this.props.src}/>
            </div>
            <div className='fullDescriptionContainer'>
              <p className='fullDescriptionText'>{this.props.fullDescription}</p>
              <div className='tagsContainer'>{tags}</div>
            </div>
          </div>
      </div>
    )
  }
}

class MePath extends React.Component {
  render() {
    return (
      <div className='contentContainer'>
        <div className='aboutMeContainer'>
          <AboutMeFolderNavBar/>
          <AboutMeDisplayScreen/>
        </div>
      </div>
    )
  }
}

class AboutMeFolderNavBar extends React.Component {
  render() {
    return (
      <div className='aboutMeFolderNavBar'>
        <AboutMeFolderitem title='Life' link='life'/>
        <AboutMeFolderitem title='Work' link='work'/>
        <AboutMeFolderitem title='Interests' link='interests'/>
      </div>
    )
  }
}

class AboutMeFolderitem extends React.Component {
  render() {
    let borderStyle = {
      borderRight: this.props.title === 'Work' ? '1px solid black' : '',
      borderLeft: this.props.title === 'Work' ? '1px solid black' : ''
    }

    return (
      <div className='aboutMeFolderitemContainer' style={borderStyle}>
        <p className='folderitem' style={{color: this.props.title.toLowerCase() === window.location.pathname.substring(4) ? '#25DAE3': 'black'}}>
          <Link to={this.props.link}>
            {this.props.title}
          </Link>
        </p>
      </div>
    )
  }
}

class AboutMeDisplayScreen extends React.Component {
  render() {
    return (
      <div className='aboutMeDisplayScreen'>
          <Route exact path={'/me/life'} component={AboutMeLifePath}/>
          <Route exact path={'/me/work'} component={AboutMeWorkPath}/>
          <Route exact path={'/me/interests'} component={AboutMeInterestsPath}/>
      </div>
    )
  }
}


class TimeLineElement extends React.Component {
  render() {
    return (
      <span className='timeLineElement' style={calculateLifeEventSizeAndBackground(this.props.id, this.props.currentLifeElement)} onClick={()=>this.props.onClick(this.props.id)}/>
    )
  }
}

class TimeLineLine extends React.Component {
  render() {
    return (
      <span className='timeLineLine' style={calculateLifeEventSizeAndBackground(this.props.id, this.props.currentLifeElement - 1, true)}/>
    )
  }
}

class AboutMeLifePath extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      'currentLifeElement': 0
    }
  }

  onClickLifeElement = (id) => {
    this.setState({
      'currentLifeElement': id
    })
  }

  render() {

    let timeLine = []
    for (let i = 0; i < LETLA.length; i++) {
      if(i !== LETLA.length - 1) {
        timeLine.push(
          <div className='timeLineYearContainer'>
            <p className='timeLineYear'>
              {LETLA[i].year}
            </p>
            <div className='timeLineElementContainer'>
              <TimeLineElement content={LETLA[i]} id={i} onClick={this.onClickLifeElement.bind(this)} currentLifeElement={this.state.currentLifeElement}/>
              <TimeLineLine id={i} currentLifeElement={this.state.currentLifeElement}/>
            </div>
          </div>
        )
      }
      else {
       timeLine.push(
         <div className='timeLineYearContainer'>
           <p className='timeLineYear'>
             {LETLA[i].year}
           </p>
           <div className='timeLineElementContainer'>
             <TimeLineElement content={LETLA[i]} id={i} onClick={this.onClickLifeElement.bind(this)} currentLifeElement={this.state.currentLifeElement}/>
           </div>
         </div>
       )
      }
    }
    return (
      <div className='aboutMeLifePath'>
        <div className='timeLineContainer'>
          {timeLine}
        </div>
        <div className='timeLineTitleAndDescriptionContainer'>
          <p className='timeLineTitle'>
            {LETLA[this.state.currentLifeElement].title}
          </p>
          <p className='timeLineDescription'>
            {LETLA[this.state.currentLifeElement].description}
          </p>
        </div>
      </div>
    )
  }
}

class AboutMeWorkPath extends React.Component {
  render() {
    let resumeLink = require('./images/FilipSlatinacCV.pdf')
    let workViews = []
    let workObject = [
      {
        title: 'University Of Ottawa',
        logo: '//upload.wikimedia.org/wikipedia/en/7/7f/University_of_Ottawa_Logo.svg',
        job: 'Full Stack Developer',
        tasks: 'Worked in a team of 5 to design, create and maintain a web application which enabled students to connect with academic adivsors.'
      },

      {
        title: 'Nokia',
        logo: '//upload.wikimedia.org/wikipedia/commons/0/02/Nokia_wordmark.svg',
        job: 'Software Designer',
        tasks: 'Worked with 4 developers to abstract' +
          ' the concept of network alarms which enabled the dynamic creation of alarms upon software errors, designers at Nokia are still using this abstraction.'
          + ' Received the maximal standing for a coop term, Exceptional.'
      },
      {
        title: 'Ciena',
        logo: '//upload.wikimedia.org/wikipedia/de/4/45/Ciena_logo.svg',
        job: 'Software Developer',
        tasks: 'Worked with 7 full time engineers on the improvement and maintainance of the UI of Blue Planet, the tool which customers such as Telus'
        + ' and Vodafone use to maintain their networks. At ther end of the term, I was nomitated as the coop student of the year as well as received the'
        + ' maximal standing for a coop term, Exceptional.'
      }
    ]

    for (let i = 0;i<workObject.length;i++) {
      workViews.push(
        <div className='workContainer'>
          <img className='workImage' src={workObject[i].logo}/>
          <div className='workTypeContainer'>
            <span className='companyNameText'>
              {workObject[i].title}
            </span>

            <span className='companyJobText'>
              {workObject[i].job}
            </span>
          </div>
          <div className='workTaskContainer'>
            <div className='companyTaskContainer'>
              {workObject[i].tasks}
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className='aboutMeWorkPath'>
        {workViews}
        <div className='resumeLinkContainer'>
          <span className='resumeLinkText'>
            Take a look at my full <a className='resumeLink' href={resumeLink} target='_blank'>resume</a>
          </span>
        </div>
      </div>
    )
  }
}

class AboutMeInterestsPath extends React.Component {
  render() {
    const config = {
      chart: {
          type: 'pie'
      },
      title: {
          text: 'Interests Distribution'
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total time spent<br/>'
    },
      series: [{
        name: 'Interests',
        data:
          [
            {
              name: 'Coding',
              y: 33,
              color: '#25DAE3'
            },
            {
              name: 'Stocks',
              y: 5,
              color: '#E32E25'
            },
            {
              name: 'Cryptocurrency',
              y: 12,
              color: '#25E38D'
            },
            {
              name: 'Statistics/Machine Learning/AI',
              y: 10,
              color: '#e3257b'
            },
            {
              name: 'Gym/Athleticism',
              y: 10,
              color: '#257BE3'
            },
            {
              name: 'Product development',
              y: 30,
              color: '#e38d25'
            }
          ]
      }]
    }

    return (
      <ReactHighcharts config = {config}></ReactHighcharts>
    )
  }
}

class ContactPath extends React.Component {
  render() {
    let chatString = 'In the Ottawa region ?  Let\'s chat'

    return (
      <div className='contentContainer'>
        <div className='contactContainer'>
          <a href='https://github.com/imfil' target='_blank'><i className="fa fa-github-square fa-5x" aria-hidden="fal"></i></a>
          <a href='https://www.linkedin.com/in/filip-slatinac-6a9a55113' target='_blank'><i className="fa fa-linkedin-square fa-5x" aria-hidden="true"></i></a>
          <a href='mailto:filipslatinac@gmail.com?Subject=Lets%20chat' target='_top'><i className="fa fa-envelope fa-5x" aria-hidden="true"></i></a>
        </div>

        <div className='appointmentContainer'>
          <a className='letsChatText' href='https://calendly.com/filipslatinac' target='_blank'>{chatString}</a>
        </div>
      </div>
    )
  }
}

class Background extends React.Component {

  render() {
    return (
      <div className='landingpage'>
          <InformationButtonContainer/>
          <Route exact path='/' render={(props) => <HomePath {...props} clickEvent={this.props.clickEvent} />}/>
          <Route exact path='/projects' component={ProjectsPath}/>
          <Route exact path='/me/:type' component={MePath}/>
          <Route exact path='/contact' component={ContactPath}/>
          <ScrollIndicatorContainer displayScroll={this.props.displayScroll}/>
      </div>
    )
  }
}


class ScrollIndicatorContainer extends React.Component {
  render() {
    return (
      <div className='scrollIndicatorContainerVisible'>
          <p className='clickAnywhereText' style={{'display': this.props.displayScroll?'':'none'}}>Click anywhere to open menu</p>
      </div>
    )
  }
}

class InformationButtonContainer extends React.Component {
  lauchInfoAlert = () => {
    swal({
      'title': 'Confused ?',
      'html': infoText,
      'type': 'question',
      'confirmButtonColor': '#B87FED',
      'confirmButtonText': '<i class="fa fa-hand-peace-o"></i>',
      'focusConfirm': false
      // 'background': `url(${alertBG}) no-repeat center center fixed`,
      // 'customClass': 'infoModal'
  })
}

  render() {
    return (
      <div className='informationButtonContainer' style={{position: 'relative'}}>
        <span className='informationButton' onClick={this.lauchInfoAlert}>
          <img className='informationButtonSVG' style={{height: 25}} src={require('./images/question.svg')}/>
        </span>
      </div>
    )
  }
}

const App = <Router><PageContainer/></Router>
ReactDOM.render(
  App,
  document.getElementById('root')
);
