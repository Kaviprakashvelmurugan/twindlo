import Styles from './index.module.css'

const ActionButton = ({action,handleActionButtonClick,activeButton}) => {
     
   
    return (
        <button onClick = {()=>{
           handleActionButtonClick(action.id)
        }}
                id = {action.id} className={`${Styles.actionButton} ${activeButton===action.id ? Styles.activeButton:'' }`}>
               {action.text}
        </button>
    )
}


export default ActionButton