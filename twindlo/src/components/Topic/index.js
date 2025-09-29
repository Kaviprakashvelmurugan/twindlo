import Styles from './index.module.css'

const Topic = ({topicDetails}) => {
  return <div className={Styles.topic}>
            <button>
                <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1759158137/chek_circle_a7uvii.png'/>
            </button>

            <div className={Styles.topicContent}>
                 <h1>{topicDetails.topic} <span className={`${Styles.difficulty} ${topicDetails.difficulty==='Hard' ? Styles.hard :topicDetails.difficulty==='Medium' ? Styles.medium :''}`}> {topicDetails.difficulty}</span></h1>
                 <p>{topicDetails.description}</p>
            </div>

            
         </div>
}

export default Topic