import Style from './index.module.css'

const Impact = () => {

  const impactData= [
        {
           number: "35k+",
           label: "Study buddies connected",
           bgGradient:'impact1'
        },
        {
          number: "1m+",
          label: "Hours of learning logged",
          bgGradient:'impact2'
        },
        {
          number: "500k+",
          label: "Challenges completed",
          bgGradient:'impact3'
        },
        {
          number: "2m+",
          label: "AI questions generated",
          bgGradient:'impact4'
        }
  ]

  return (

        <div className={Style.impactBg}> 
           
            <div className={Style.impactContent}>
                 <div className= {Style.impactHeader}>
                      <h1 className={Style.impactHeaderHeading}>Trusted by <span> 43 Thousand + </span>  Achievers</h1>
                 </div>

                 <ul className={Style.impacts}>
                 {
                    impactData.map(eachImpact=>{
                        return <li className={Style.impact}>
                                   <h1 className ={`${Style.impactHeading} ${Style[eachImpact.bgGradient]}`}>{eachImpact.number} </h1>
                                   <label>{eachImpact.label}</label>
                               </li> 
                    })
                 }
               </ul>
            </div>
            </div>
            
       
  )

}

export default Impact