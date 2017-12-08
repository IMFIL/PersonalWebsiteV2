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

const projectTitles = ['Pegasus', 'pettrace', 'CookR', 'BusNow']
const projectDescriptions = ['Interviewing made simple', 'Lost a loved one? Let us help', 'Infinite recipes at your fingertips', 'Never miss a bus again']
const projectSrcs = [
  {'src': require('../images/pegasusPicture.png'), 'styleL': {width: 500, height: 500}, 'styleM': {width: 400, height: 400}, 'styleS': {width: 300, height: 300}},
  {'src': require('../images/pLostPicture.png'), 'styleL': {width: 600, height: 400}, 'styleM': {width: 480, height: 200}, 'styleS': {width: 300, height: 200}},
  {'src': require('../images/cookRPicture.png'), 'styleL': {width: 500, height: 500}, 'styleM': {width: 400, height: 400}, 'styleS': {width: 300, height: 300}},
  {'src': require('../images/busNowPicture.png'), 'styleL': {width: 420, height: 350, paddingTop: 50}, 'styleM': {width: 320, height: 250, paddingTop: 30}, 'styleS': {width: 200, height: 120, paddingTop: 20} }
]

class LifeEvent {
  constructor(title, description, year) {
    this.title = title
    this.description = description
    this.year = year
  }
}

class ProjectItem {
  constructor(title, description, src, styleL, styleM, styleS) {
    this.title = title
    this.description = description
    this.src = src
    this.styleL = styleL,
    this.styleM = styleM,
    this.styleS = styleS
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
    projectSrcs[i]['styleS']
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
