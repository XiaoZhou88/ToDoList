//页面加载完调用load函数，即页面的初始化
window.addEventListener("load",load);

//定义全局变量
var things

//加载所有事项的函数
function load() {
  //获取DOM元素
  var todo=document.getElementById("things")

  //设置待办事件的初始值
  var todocontent=""

  //获取待完成的元素
  var todolist=document.getElementById("todolist")

  //获取localhost中缓存的事件
  var list=localStorage.getItem("things")
  if (list != null)
  {
    //将json对象转换为js对象
    things=JSON.parse(list)
  }
  else
  {
    things=[]
  }

  //如果缓存的数据存在，遍历并取出
  if (things != null)
  {
    for (var i=0;i<things.length;i++)
    {
      todocontent += "<li>" + "<span>" +things[i].todo + "</span>"
          +"<span class='close' onclick=" + "del(" + i + ")> \u00D7 </span>"
          + "</li>"; //拼接上字符串，以便后续使用

    }
    todolist.innerHTML=todocontent
  }
  else{
    todolist.innerHTML=""
  }
}

//1.处理删除事件
function del(i) {
  things.splice(i,1)
  save()
}


//3.处理任务完成事件
var list=document.querySelector("ul")

list.addEventListener('click',function (ev) {
//event.target属性可以用来实现事件委托，例如将事件绑定在ul上，但是点击li时可以被触发
  //tagName是获取元素的标签名
  if (ev.target.tagName === 'LI')
{
  //toggle方法在被选元素上进行hide（）和show（）之间的切换
  //classList对元素的class进行操作
  ev.target.classList.toggle('check')
}
},false);

//定义一个变量用来存放新增的事件
var newtodo={
  todo:"",  //存储用户输入的内容
}
//4.处理点击add按钮，列表中添加一个待办事项
function addElement(e){
 var temp=document.getElementById('things').value

  //将temp赋值给newtodo的todo对象
  newtodo.todo=temp

  if (temp == '')
  {
    alert("请输入待办事件")
  }
  else
  {
    //将新增的元素添加到localstorage的things中
    things.push(newtodo)
    document.getElementById("things").value=""
    save()
  }
}

//按回车键添加事物
document.getElementById("things").onkeypress=function (event) {
  if (event.keyCode===13){
    addElement(event)
  }
}

//保存数据的函数
function save() {
  localStorage.setItem("things",JSON.stringify(things))
  load()
}

console.log(localStorage.getItem("things"))