window.addEventListener('load',function () {
    let tops=document.querySelectorAll('.top>li');
    let prev=0;
    let content=document.querySelector('.mvk');
    let type=`all`;
    let todolist=[
        {
            id:1,content:'端午要交作业',ctime:'2019/6/4',status:false,symbol:'×'
        },
        {
            id:2,content:'你不交作业',ctime:'2019/6/4',status:false,symbol:'×'
        },
        {
            id:3,content:'过端午',ctime:'2019/6/7',status:true,symbol:'×'
        },
        {
            id:4,content:'个人博客',ctime:'2019/5/31',status:false,symbol:'×'
        },
    ];


    tops.forEach(function(ele,index){
       ele.onclick=function () {
           tops[prev].classList.remove('hot');
           ele.classList.add('hot');
           prev=index;
           type=this.getAttribute('type');
           render(filterdata(type));
       }
    });
     tops[0].onclick();


     content.onclick=function(e){
        let target=e.target;
        let id=target.parentNode.id;
        if(target.nodeName===`DEL`){
            let index=todolist.findIndex(ele=>ele.id ==id);
            todolist.splice(index,1);

        }else if(target.nodeName===`INPUT`){
            let ele=todolist.filter(ele=>ele.id ==id)[0];
            ele.status=target.checked;
        }
         render(filterdata(type));
     };

     let forms =document.forms[0];
     let inputs=forms.elements['content'];
     let submits=forms.elements[1];
     submits.onclick=function (e) {
         e.preventDefault();
         let obj=creatobj();
         todolist.push(obj);
         forms.reset();
         render(filterdata(type));
     };
    function creatobj(){
         let id = todolist[todolist.length-1].id+1;
         let content=inputs.value;
         let ctime=new Date().toLocaleDateString();
         let status=false;
         if(!content){
           
         }
        return {id,content,ctime,status};
    }


     function filterdata(type){
         let arr=[];
         switch (type) {
             case 'all':
                 arr = todolist;
                 break;
             case 'done':
                 arr = todolist.filter(function(ele){return ele.status});
                 break;
             case 'doing':
                 arr = todolist.filter(function(ele){return !ele.status});
                 break;
         }
         return arr;
     }



     render(todolist);
    function render(arr) {
       let html=``;
       arr.forEach(function(elem,index){

           if(elem.status){
               html+= `
             <li id="${elem.id}">
                   <input type="checkbox" checked>
                    <p>${elem.content}</p>
                    <del>×</del> 
                    <time>${elem.ctime}</time>
             </li>
           `;
           }else{
               html+= `
             <li id="${elem.id}">
                   <input type="checkbox"> 
                   <p>${elem.content}</p>
                   <del>×</del> 
                   <time>${elem.ctime}</time>
             </li>
           `;
           }

       });
       content.innerHTML=html;
    }

});
  


