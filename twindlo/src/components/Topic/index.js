import Styles from './index.module.css'

const Topic = ({topicDetails,handleTopicSelection,isTopicSelected}) => {
 

  const handleTopicClick = () => {
      handleTopicSelection(topicDetails)
  }
  return <div className={Styles.topic}>
            <button  onClick={handleTopicClick}>
                {isTopicSelected? <> <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1759158136/checked_round_z48eb4.png' alt='check-box'/></> :<img src='https://res.cloudinary.com/djtbynnte/image/upload/v1759158137/chek_circle_a7uvii.png' alt='check-box'/>}
            </button>

            <div className={Styles.topicContent}>
                 <h1>{topicDetails.topic} <span className={`${Styles.difficulty} ${topicDetails.difficulty==='Hard' ? Styles.hard :topicDetails.difficulty==='Medium' ? Styles.medium :''}`}> {topicDetails.difficulty}</span></h1>
                 <p>{topicDetails.description}</p>
            </div>

            
         </div>
}

export default Topic