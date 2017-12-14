import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import Swipe from 'react-swipe-component';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import styles from '../css/mobile.css'
import {
  infoText,
  textShadowClicked,
  LETLA,
  calculateLifeEventSizeAndBackground,
  projectsItems
} from './utils.js'
import swal from 'sweetalert2';

const ReactHighcharts = require('react-highcharts')



//send min and max width to background mobile

class BackgroundMobile extends React.Component {

  componentDidMount() {
    document.body.classList.toggle('mobileBGSetter', true)
  }

  componentWillUnmount() {
    document.body.classList.remove('mobileBGSetter')
  }
  render () {
    return (
      <div className='landingpageMobile'>
        <NavigationBarContainerMobile/>
        <HomePageMobile/>
      </div>
    )
  }
}

class NavigationBarContainerMobile extends React.Component {
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
      <div className='navigationBarContainerMobile' style={{position: 'relative'}}>
        <span className='informationButtonMobile' onClick={this.lauchInfoAlert}>
          <img className='informationButtonSVGMobile' style={{height: 17}} src={require('../images/question.svg')}/>
        </span>
      </div>
    )
  }
}
class HomePageMobile extends React.Component {
  render () {
    // let styles = {
    //  'wi'
    // }
    return (
      <div className='splashContainerMobile'>
        <p className='nameDisplayMobile'>Filip Slatinac</p>
        <p className='displayAttributesMobile'>
          - Insert Typical Software Engineering Student Desicription Here -
        </p>
      </div>
    )
  }
}

class ProjectsPathMobile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'id': 0
    }
  }

  frontPicture = () => {
    this.setState({
      'id': this.state.id < projectsItems.length - 1 ? this.state.id + 1 : this.state.id
    })
  }

  backPicture = () => {
    this.setState({
      'id': this.state.id > 0 ? this.state.id - 1 : this.state.id
    })
  }

  render() {
    let projectComponents = []

    for (let i = 0; i < projectsItems.length; i++) {
      projectComponents.push(<ProjectItemMobile title={projectsItems[i].title} description={projectsItems[i].description} src={projectsItems[i].src} style={projectsItems[i]}/>)
    }

    let styles = {
      flexDirection: 'row',
      paddingTop: 0
    }

    return (
      <div className="contentContainerMobile" style={styles}>
        <div className='projectContainerMobile'>
          {projectComponents[this.state.id]}
        </div>
      </div>
    )
  }
}

class ProjectItemMobile extends React.Component {
  render() {
    return (
      <div className='projectItemContainerMobile'>
        <div className='projectViewContainerMobile'>
          <span className='projectTitleMobile'>
            {this.props.title}
          </span>
          <span className='projectDescriptionMobile'>
            {this.props.description}
          </span>
        </div>
        <div className='imageContainer'>
          <img style={this.props.style.styleL} className='projectImageMobile' src={this.props.src}/>
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
    let resumeLink = require('../images/FilipSlatinacCV.pdf')
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
      },
      {
        title: 'Ciena',
        logo: '//upload.wikimedia.org/wikipedia/de/4/45/Ciena_logo.svg',
        job: 'Software Developer',
        tasks: 'Worked with 7 full time engineers on the improvement and maintainance of the UI of Blue Planet, the tool which customers such as Telus and Vodafone use to maintain their networks.'
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
    return (
      <div className='contentContainer'>
        <div className='contactContainer'>
          <i className="fa fa-github-square fa-5x" aria-hidden="fal"></i>
          <i className="fa fa-linkedin-square fa-5x" aria-hidden="true"></i>
          <i className="fa fa-envelope fa-5x" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

export {BackgroundMobile}