const ques = document.getElementById('ques');
const listans = document.querySelectorAll('li');
let score = 0;
let quesNumber = 0;
const next = document.getElementById('next');
const button = document.getElementById('replay');   




async function req() {

      const respone = await fetch('https://opentdb.com/api.php?amount=10');
      const data = await respone.json()
      console.log(data);


      next.onclick = () => {
         
         quesNumber += 1;
         console.log(quesNumber)
        listans.forEach((ele) => {
         ele.classList.remove('correct', 'wrong');
        })
         if (quesNumber >= 10) {
            document.querySelector('.quizApp').classList.add("hide");
            document.querySelector('.score').classList.remove('hide');
            document.getElementById('score').innerHTML = "your score is " + score

                

         } else {
          
            setQues(data, quesNumber);
            setcorrecAns(data ,quesNumber);
         }
      }
   


      setQues(data, quesNumber);
      setcorrecAns(data ,quesNumber);

}





 function setQues(data , number) {
   
  
     ques.innerHTML = data.results[number].question;

   }

  
   
   function setcorrecAns(data , number) {
      let  correctAnsIndx = Math.floor(Math.random() * 4);
      let answers = data.results[number].incorrect_answers;
      if(correctAnsIndx > 2) {
         answers.push(data.results[number].correct_answer);
      } else {
         let temp = ''
        temp =  answers[correctAnsIndx];
        answers[correctAnsIndx] =  data.results[number].correct_answer;
        answers.push(temp);
      }
     
      for (let i = 0; i   < answers.length; i++) {
         listans[i].innerHTML = answers[i];
         
      }

         listans.forEach((ele) => {
            ele.onclick = () => {
               console.log('he');
               if(event.target.innerHTML == answers[correctAnsIndx]) {
                  event.target.classList.add('correct');
                  score += 1;
               }else {
                  event.target.classList.add('wrong');
               }
               
            }
         })
    
     
      }

      
      document.getElementById('replay').onclick = () => {
         document.querySelector('.quizApp').classList.remove("hide");
         document.querySelector('.score').classList.add('hide');
         score = 0;
         quesNumber= 0;
         req();

      }
   



   req();
