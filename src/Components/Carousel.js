// the carousel component in the about section 
import '../Styles/Carousel.scss';
import React, {useState} from 'react';
import Carousel from 'react-simply-carousel';
import StickyNote from './StickyNote';


export default function AboutCarousel(props) {
  const [activeSlide, setActiveSlide] = useState(0); // sticky notes that are displayed
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      if (activeSlide >= 4) {
        document.getElementById('carousel-backward').click();
      } else if (activeSlide < 4) {
        document.getElementById('carousel-forward').click();
      }
    };
    window.addEventListener('resize', handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [activeSlide]);

  const stickyNoteOneTitle = 'Team Diversity';
  const stickyNoteOneContent = 'Unlike other \'hackathons\', eHacks requires that each team have 2 non-technical and 2 technical team members.' +
      ' This allows competitors to make new connections, teach each other new skills, and succeed in the competition.';

  const stickyNoteTwoTitle = 'Feasible & Technical';
  const stickyNoteTwoContent = 'Technical skills alone are not enough to succeed in the workplace. That\'s why non-technical expertise isn\'t just welcome at eHacks: its required to earn half of the team\'s overall score.';

  const stickyNoteThreeTitle = 'Varied Workshops';
  const stickyNoteThreeContent = 'Each year, eHacks offers an equal number of technically focused and business focused workshops. By teaching both of these skills equally, we empower teams to create feasible, technically interesting projects that can become sustainable ventures.';

  const stickyNoteFourTitle = '1:1 Feedback';
  const stickyNoteFourContent = 'Rather than share your project in a "science fair" style, all eHacks participants will prepare a presentation for a panel of judges. This ensures all competitors have the chance to fully explain their work and get personalized feedback.';

  const stickyNoteFiveTitle = 'Social Responsibility';
  const stickyNoteFiveContent = 'At eHacks, we are focused on social innovation. All projects at the event are focused on making the world a better place. Plus, though our partnership with Enactus Western, all competitors can scale their business into an impactful social enterprise.';

  const stickyNoteSixTitle = 'Constant Support';
  const stickyNoteSixContent = 'We expect a lot at eHacks, but we support competitors every step of the way. Through our skilled mentors, mandatory organizer check-ins, and extensive helper resources, our competitors learn more than they could have ever imagined.';

  return (
    <div>
      <Carousel
        updateOnItemClick
        swipeable={true}
        // containerProps={{style: {width: '100%', justifyContent: 'space-between'}}}
        containerProps={{className: 'carousel-container'}}
        activeSlideIndex={activeSlide}
        onRequestChange={setActiveSlide}
        itemsToShow={width >= 1600 ? 3 : width > 1100 ? 2 : 1}
        infinite={false}
        speed={400}
        forwardBtnProps={{children: '>', className: 'button-style', id: 'carousel-forward'}}
        backwardBtnProps={{children: '<', className: 'button-style', id: 'carousel-backward'}}
      >
        {/* each sticky note */}
        {Array.from({length: 6}).map((item, index) => (
          <div className="note-background" key={index}>
            {index == 0 ? <StickyNote class="note-yellow sticky-background" title={stickyNoteOneTitle} content={stickyNoteOneContent}/> : ''}
            {index == 1 ? <StickyNote class="note-green sticky-background" title={stickyNoteTwoTitle} content={stickyNoteTwoContent}/> : ''}
            {index == 2 ? <StickyNote class="note-blue sticky-background" title={stickyNoteThreeTitle} content={stickyNoteThreeContent}/> : ''}
            {index == 3 ? <StickyNote class="note-bluedark sticky-background" title={stickyNoteFourTitle} content={stickyNoteFourContent}/> : ''}
            {index == 4 ? <StickyNote class="note-purple sticky-background" title={stickyNoteFiveTitle} content={stickyNoteFiveContent}/> : ''}
            {index == 5 ? <StickyNote class="note-pink sticky-background" title={stickyNoteSixTitle} content={stickyNoteSixContent}/> : ''}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
