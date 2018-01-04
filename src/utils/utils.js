const infoText = 'If you clicked this you are most likely wondering one, or both, of the following two things.' +
  '<br> <br> 1.<i>Why is his background image so pixalated ? </i> <br> 2.<i> Did he really use a template and forget to fill in' +
  ' the description ? </i> <br><br> Those two things were made so purposely. <br>Like it ? check out ' +
  '<a class="vaporwaveLink" target="_blank" href="http://aesthetic.wikia.com/wiki/Vaporwave#Imagery">Vaporwave</a>'
const textShadowClicked = '1px white solid'
const lifeDescriptions = [
  'The day of my birth, May 26th 1996, I was born in the city of Belgrade, Serbia.',
  'After spending a mere year in Serbia my parents took the initiative of immigrating to Canada.',
  'Fast-forward 10 years, this is the year that I first started high school at L\'École Secondaire de L\'Île.',
  'Fast-forward another 6 years, I was sitting in my Cegep Biology class playing FlappyBird. For some strange reason I was moved by that game.' +
    ' That same day, I created an account on Code Acadamy and started teaching myself how to code.',
  'After barely getting admitted to the University of Ottawa\'s Computer Enginering program, I decided to turn my life around and commit towards a life of hard work and dedication.',
  'Here we are now, I switched into Software Engineering, had my name on the dean\'s honour list since first year and still am dedicated to contribute to the field of Computer Science.'
]
const lifeYears = [1996, 1997, 2007, 2013, 2015, 2018]
const lifeTitles = ['Birth', 'Canada', 'High School', 'Hello World', 'University', 'Present']
const widthLifeSelected = 40
const widthLifeUnselected = 25
const backgroundSelected = '#25DAE3'
const backgroundUnselected = 'grey'

const projectTitles = ['Pegasus', 'CookR', 'pettrace', 'BusNow']
const projectDescriptions = ['Interviewing made simple', 'Infinite recipes at your fingertips', 'Lost a loved one? Let us help', 'Never miss a bus again']
const projectTags = [['Python', 'Android', 'HTML', 'CSS'], ['Android', 'SQLLITE'], ['Meteor', 'Javascript', 'HTML', 'CSS'], ['Javascript']]
const projectLinks = ['https://github.com/IMFIL/Pegasus', 'https://github.com/IMFIL/cookR', 'https://github.com/IMFIL/petTrace', 'https://github.com/IMFIL/BusNow']
const projectFullDescription = [
  'Pegasus was developed due to a common frustration amongst students, the extensive overhead present while searching for interview preparation resources. ' +
  'Pegasus enables users to seamlessly find interview resources with as little as the company name. Simply search the company name and let Pegasus do the rest while you focus on what really matters.',
  'CooKr was initially conceived for a Software Engineering class, but grew to be so much more. We utilized known user interface heuristics to make our application ' +
  'as visually appealing and easy to use as possible. This effort led to CooKr being selected as the best looking application in a class of 98 students.',
  'PetTrace was developed when my dog joined our family. In the first week of Aldo arriving to our household, he ran away. We luckily found him after a few hours, but the thought of ' +
  'losing my pet again was terrifying. Due to a lack of online resources on how to locate lost pets, we decided to create an online platefrom where users can broadcast lost and found animals.',
  'BusNow is a pebble application which was developed due to the annoyance of having to remove winter gloves to check the bus times, instead of having to deal with the cold why not let ' +
  'pebble send your geo-location to a google API which finds the nearest bus stop and the arrival times of all the busses ?'
]
const projectSrcs = [
  {'src': require('../images/pegasusPicture.png'), 'styleL': {width: 600, height: 600}, 'styleM': {width: 400, height: 400}, 'styleS': {width: 300, height: 300}},
  {'src': require('../images/cookRPicture.png'), 'styleL': {width: 600, height: 600}, 'styleM': {width: 400, height: 400}, 'styleS': {width: 300, height: 300}},
  {'src': require('../images/pLostPicture.png'), 'styleL': {width: 990, height: 600}, 'styleM': {width: 330, height: 200}, 'styleS': {width: 300, height: 200}},
  {'src': require('../images/busNowPicture.png'), 'styleL': {width: 480, height: 400, paddingTop: 100}, 'styleM': {width: 300, height: 250, paddingTop: 50}, 'styleS': {width: 200, height: 120, paddingTop: 20} }
]

class LifeEvent {
  constructor(title, description, year) {
    this.title = title
    this.description = description
    this.year = year
  }
}

class ProjectItem {
  constructor(title, description, src, styleL, styleM, styleS, tags, fullDescription, link) {
    this.title = title
    this.description = description
    this.src = src
    this.styleL = styleL
    this.styleM = styleM
    this.styleS = styleS
    this.tags = tags
    this.fullDescription = fullDescription
    this.link = link
  }
}

let LETLA = []
for(let i = 0; i < lifeTitles.length; i++) {
  LETLA.push(new LifeEvent(lifeTitles[i], lifeDescriptions[i], lifeYears[i]))
}

let projectsItems = []
for(let i = 0; i < projectTitles.length; i++) {
  projectsItems.push(new ProjectItem(
    projectTitles[i],
    projectDescriptions[i],
    projectSrcs[i]['src'],
    projectSrcs[i]['styleL'],
    projectSrcs[i]['styleM'],
    projectSrcs[i]['styleS'],
    projectTags[i],
    projectFullDescription[i],
    projectLinks[i]
  ))
}

function calculateLifeEventSizeAndBackground(currentId, id, isLine = false) {
  let widthVar
  let heightVar
  let backgroundVar

  if (id > currentId) {
    if (!isLine) {
      widthVar = widthLifeUnselected
      heightVar = widthLifeUnselected
    }
    backgroundVar = backgroundSelected
  }

  else if (id < currentId) {
    if (!isLine) {
      widthVar = widthLifeUnselected
      heightVar = widthLifeUnselected
    }
    backgroundVar = backgroundUnselected
  }

  else {
    if (!isLine) {
      widthVar = widthLifeSelected
      heightVar = widthLifeSelected
    }
    backgroundVar = backgroundSelected
  }

  let styling = {
    width: widthVar ? widthVar : 35,
    height: heightVar ? heightVar : 1,
    backgroundColor: backgroundVar
  }

  return styling
}

export {infoText, textShadowClicked, LETLA,
    calculateLifeEventSizeAndBackground, projectsItems}


    //home
    // <MediaQuery minDeviceWidth={750} maxDeviceWidth={1030}>
    //   <p className='nameDisplay' style={{fontSize:50}}>Filip Slatinac</p>
    //   <p className='displayAttributes' style={{fontSize:25}}>
    //     - Insert Typical Software Engineering Student Desicription Here -
    //   </p>
    // </MediaQuery>
    // <MediaQuery query="(max-device-width: 500px)">
    //   <p className='nameDisplay' style={{fontSize:40}}>Filip Slatinac</p>
    //   <p className='displayAttributes' style={{fontSize:10}}>
    //     - Insert Typical Software Engineering Student Desicription Here -
    //   </p>
    // </MediaQuery>

    //projects, add swipe
    // <MediaQuery minDeviceWidth={750} maxDeviceWidth={1030}>
    //   <div className='projectContainer' style={{width: 450}}>
    //     {projectComponents[this.state.id]}
    //   </div>
    // </MediaQuery>
    //
    // <MediaQuery maxDeviceWidth={500}>
    //   <div className='projectContainer' style={{width: 250}}>
    //     {projectComponents[this.state.id]}
    //   </div>
    // </MediaQuery>

    //Project item container
    // <MediaQuery minDeviceWidth={750} maxDeviceWidth={1030}>
    //   <div className='projectViewContainer'>
    //     <span className='projectTitle'>
    //       <p style={{fontSize:35, margin: 0}}>{this.props.title}</p>
    //     </span>
    //     <span className='projectDescription'>
    //       <p style={{fontSize:30, margin: 0}}>{this.props.description}</p>
    //     </span>
    //   </div>
    //   <div className='imageContainer'>
    //     <img style={this.props.style.styleM} className='projectImage' src={this.props.src}/>
    //   </div>
    // </MediaQuery>
    //
    // <MediaQuery maxDeviceWidth={500}>
    //   <div className='projectViewContainer'>
    //     <span className='projectTitle'>
    //       <p style={{fontSize:20, margin: 0}}>{this.props.title}</p>
    //     </span>
    //     <span className='projectDescription'>
    //       <p style={{fontSize:15, margin: 0}}>{this.props.description}</p>
    //     </span>
    //   </div>
    //   <div className='imageContainer'>
    //     <img style={this.props.style.styleS} className='projectImage' src={this.props.src}/>
    //   </div>
    // </MediaQuery>
