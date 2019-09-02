// const jugeValue = (value)=>{
//     return (value||value==0)?true:false
// };

const judgeValue = (...arg)=>{
    let flag = new Boolean(true);
    arg.map((item)=>{
        if (!item&&item!==0){
            if (flag==true){
                flag = false
            }
        }
    });
    return flag;
};

export default judgeValue;
