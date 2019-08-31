const imgList = [
    "http://qukufile2.qianqian.com/data2/pic/6a6489bd9627769702ac6c9a056b7446/556061188/556061188.jpg"
];

const randomImg = ()=>{
    return imgList[Math.floor(Math.random()*imgList.length)];
};

export default randomImg;
