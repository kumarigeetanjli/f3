let main=document.getElementById("contain");
let search=document.getElementById("INPUT");
let sbut=document.getElementById("sbtn");
let msg=document.getElementById("pop");

let arr=[];


sbut.addEventListener("click",getfun)

function getfun()
{
 
  var date = new Date();
  var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  var am_pm = date.getHours() >= 12 ? "PM" : "AM";
  hours = hours< 10 ? "0" + hours : hours;
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  var time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
  



  main.innerHTML="";
  let sk={search:`${search.value}`,
           date:date.getDate()+'/'+parseInt(date.getMonth()+1)+'/'+date.getFullYear()+ "        "+`${time}`}
  
  arr.push(sk);

localStorage.setItem("data" , JSON.stringify(arr))



const Url=`https://www.googleapis.com/books/v1/volumes?q=${search.value}`

fetch(Url).then((apidata)=>{
     console.log(apidata);

      return apidata.json();

        })

.then((actualdata)=>{

         
  let count=0;
  let find=search.value;
  for(let i=0;i<10;i++)
  
  {
          let data=actualdata.items[i];
        
         if(data.volumeInfo.title.toLowerCase().split(" ").join("").includes(find.toLowerCase().split(" ").join(""))|| data.volumeInfo.authors[0].toLowerCase().split(" ").join("").includes(find.toLowerCase().split(" ").join("")))
         
         {
        
           msg.innerHTML="";
           msg.innerHTML=` ${find}`
           msg.style.color="grey";
           count=1;
         search.value="";
            
            let sk=document.createElement('div');
            sb=document.createElement('button');
            sb.innerHTML="BUY ";
            sb.style.height="34px";
            sb.style.width="170px";
           
            //border-radius: 8px;
            
            sk.innerHTML=`
          
            <img src=${data.volumeInfo.imageLinks.thumbnail} height="189" width="189" alt="not" /> 
            <br>
            Name: ${data.volumeInfo.title}
            <br>
            
           
            writer  :${data.volumeInfo.authors[0]}
            <br>
            
            Rate on 5 :${data.volumeInfo.averageRating}
            
            
            `
            sk.append(sb);
            sk.style.height="380px";
            sk.style.width="180px";
            
            
            sk.style.borderRadius="6px";
            sk.style.borderColor="grey"
            sk.style.display="block";
           
            sk.style.borderColor="sky";
            sk.style.backgroundColor="black";
            sk.style.color="white";
           
         main.append(sk);








         }
         else{
           msg.innerHTML="";
          msg.innerHTML=`not find`;
          msg.style.color="blue";
         }

       };
       

     })
    
    }
