import styles from './index.module.css'

const TaskExplainer = ({taskIcon,updataMouseOnIt}) => {
    const {id,iconUrl,text,subText,mouseOnIt} = taskIcon

    const handleMouseEnter = () => {
        updataMouseOnIt(id)
    }

    
    return (
        <div onMouseEnter = {handleMouseEnter} className={`${styles.iconExplainer} ${mouseOnIt ? styles.iconExplainerExpanded : ''}`}>
           <div className={`${mouseOnIt?  styles.iconExpLeftWhenOnMouse: styles.iconExpLeft}`}>
              <img src={iconUrl} alt='taskIcons'/>
           </div>

           <div className={`${ mouseOnIt? styles.iconExpRightWhenOnMouse : styles.iconExpRight}`}>
                <h1>{text}</h1>
                {mouseOnIt && <p> {subText}</p>}
           </div>
        </div>
    )
}

export default TaskExplainer