import './index.css'

const UserFeedback= () => {

    
    return (
        <>
           <div className='user-review-box'>
           <div className='feedback-part-1'>
               
               <div className='feedback-part-1-header'>
                  <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752826524/twindlo-logo-whte_va8wqo.png' alt='twindlo-white-logo'/>
                  <h1>The Twindlo Effect</h1>
               </div>

               <div className='feedback-left-to-right'>
                    <div className='feedback-large '>
                       <div className='feedbacks-large feedaback-element '>
                           <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752830029/230db019-421c-4a5d-9fd5-395efebbce5d_uoyjmx.jpg' alt='none' />
                           <p className='feedback-user'>Kiran ,20 Years Old</p>
                           <p className='feedback-content'>I used to study 3 hours a week—now I hit 25 hours with my Twindlo buddy. We keep each other accountable with weekly challenges.</p>
                       </div>
                    </div>
                    <div className='feedback-small' >
                       <div className='feedbacks feedaback-element'>
                           <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752914473/1533e65d-965b-494a-890e-ed029403ff32_khhbaq.jpg' alt='none'/>
                           <div className='small-review-box'>
                              <p className='feedback-user'>Anjuma ,22 Years Old</p>
                             <p className='feedback-content'>Met my React partner here—we review PRs every Thursday</p>
                           </div>
                       </div>
                    </div>
                    <div className='feedback-small'>
                       <div className='feedbacks feedaback-element'>
                           <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752915172/978eb719-17cc-4fb3-82e0-da66bdbc2863_ny2rdd.jpg' alt='none'/>
                           <div className='small-review-box'>
                              <p className='feedback-user'>Kishore ,17 Years Old</p>
                             <p className='feedback-content'>Started as math buddies, and now She’s my person</p>
                           </div>
                       </div>
                    </div>
               </div>

               <div className='feedback-right-to-left'>
                    <div className='feedback-small' >
                       <div className='feedbacks feedaback-element'>
                           <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752915274/072148ca-dba9-4921-8a90-20e6866cc03d_zalb1p.jpg' alt='none'/>
                           <div className='small-review-box'>
                              <p className='feedback-user'>Nandhini ,16 Years Old</p>
                             <p className='feedback-content'>3AM study rooms saved my grades (and sanity)</p>
                           </div>
                       </div>
                    </div>
                    <div className='feedback-small'>
                       <div className='feedbacks feedaback-element'>
                           <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752915510/52b1a236-0344-4577-8a89-dae85eb72790_lxrcsa.jpg' alt='none'/>
                           <div className='small-review-box'>
                              <p className='feedback-user'>Tamilselvan ,17 Years Old</p>
                             <p className='feedback-content'>We promised to study ended up crying over breakups.</p>
                           </div>
                       </div>
                    </div>
                    <div className='feedback-large'>
                        <div className='feedbacks-large feedaback-element '>
                           <img src='https://res.cloudinary.com/djtbynnte/image/upload/v1752854674/fd563ede-a1ab-40e4-9c97-094f7d972199_zjfjpo.jpg' alt='none' />
                           <p className='feedback-user'>Vishalini,18 years old</p>
                           <p className='feedback-content'>Studying alone was depressing. Here, I found Ananya—we do 6AM live sessions every day. First time I’ve stuck to a timetable for 2 months straight and we’ve become close friends.</p>
                       </div>
                    </div>
               </div>

           </div>
          <div className='feedback-part-2'>

               <div className='feedback-part-2-video-box'>
                   <video src='https://res.cloudinary.com/djtbynnte/video/upload/v1752934150/videoplayback_2_wjquaq.mp4' muted autoPlay playsInline loop width='80%'/>
                   <p className='element'>From wake-up to wind-down — see discipline in motion</p>
               </div>
               
               <div className='feedback-part-2-body-box element'>
                  <h1>Ready to Build <br/>the Most Disciplined<br/> Version of You?</h1>
                  <p>Step into the mindset. Unlock consistency. Join the movement.</p>
               </div>

               <div className='feedback-part-2-cta-box'>
                   <div className='feedback-part-2-cta-border-box'>
                     <button>Find the right person !</button>
                   </div>
                    
               </div>
           </div>
        </div>


          <div className='feedback-part-2-for-mobile'>

               <div className='feedback-part-2-for-mobile-video-box'>
                   <video src='https://res.cloudinary.com/djtbynnte/video/upload/v1752934150/videoplayback_2_wjquaq.mp4' muted autoPlay playsInline loop width='80%'/>
                   <p className='element'>From wake-up to wind-down — see discipline in motion</p>
               </div>
               
               <div className='feedback-part-2-for-mobile-body-box element'>
                  <h1>Ready to Build the Most Disciplined Version of You?</h1>
                  <p>Step into the mindset. Unlock consistency. Join the movement.</p>
               </div>

               <div className='feedback-part-2-for-mobile-cta-box'>
                   <div className='feedback-part-2-for-mobile-cta-border-box'>
                     <button>Find the right person !</button>
                   </div>
                    
               </div>
           </div>


        </>
       

        
         
    )
}

export default UserFeedback